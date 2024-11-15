use crate::{
  data::transaction::{ProductInTransaction, Transaction, TransactionDetail},
  db,
  guards::AuthGuard,
};
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};
use sqlx::Connection;

#[derive(Serialize, Deserialize)]
struct CreateTransactionInput {
  ttype: String,
  tax_percent: f64,
  total_price: f64,
  paid: Option<f64>,
  products: Vec<ProductInTransaction>,
}

#[get("/")]
async fn list(_auth: AuthGuard) -> Json<Vec<Transaction>> {
  let mut connection = db::get_connection().await;
  let transactions = sqlx::query_as!(
    Transaction,
    r#"SELECT id, ttype, tax_percent, total_price, paid, created_at
      FROM transaction"#
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();
  Json(transactions)
}

#[get("/<id>")]
async fn detail(_auth: AuthGuard, id: i32) -> Json<TransactionDetail> {
  let mut connection = db::get_connection().await;
  let transaction = sqlx::query_as!(
    Transaction,
    r#"SELECT id, ttype, tax_percent, total_price, paid, created_at
      FROM transaction
      WHERE id = $1"#,
    id
  )
  .fetch_one(&mut *connection)
  .await
  .unwrap();

  let products = sqlx::query_as!(
    ProductInTransaction,
    r#"SELECT pit.product_id AS id, pit.name, pit.unit_price, pit.count, pit.total_price
      FROM product_in_transaction pit
      WHERE pit.transaction_id = $1"#,
    id
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();

  let transaction_detail = TransactionDetail {
    id: transaction.id,
    ttype: transaction.ttype.into(),
    tax_percent: transaction.tax_percent,
    total_price: transaction.total_price,
    paid: transaction.paid,
    created_at: transaction.created_at,
    products: products,
  };

  Json(transaction_detail)
}

#[post("/", format = "json", data = "<input>")]
async fn create(
  _auth: AuthGuard,
  input: Json<CreateTransactionInput>,
) -> Status {
  let mut connection = db::get_connection().await;
  let mut tx = (&mut *connection).begin().await.unwrap();
  let transaction = sqlx::query!(
    r#"INSERT INTO transaction 
    (ttype, tax_percent, total_price, paid) 
    VALUES ($1, $2, $3, $4)
    RETURNING id"#,
    input.ttype,
    input.tax_percent,
    input.total_price,
    input.paid.as_ref(),
  )
  .fetch_one(&mut *tx)
  .await
  .unwrap();

  for product in &input.products {
    sqlx::query!(
      r#"INSERT INTO product_in_transaction 
      (product_id, transaction_id, name, unit_price, count, total_price) 
      VALUES ($1, $2, $3, $4, $5, $6)"#,
      product.id,
      transaction.id,
      product.name,
      product.unit_price,
      product.count,
      product.total_price
    )
    .execute(&mut *tx)
    .await
    .unwrap();
  }

  tx.commit().await.unwrap();

  Status::Created
}

pub(super) fn transaction_routes() -> Vec<Route> {
  routes![list, detail, create]
}
