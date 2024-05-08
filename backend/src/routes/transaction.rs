use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Debug, sqlx::Type, Serialize, Deserialize)]
#[sqlx(type_name = "transaction_type", rename_all = "lowercase")]
pub enum TransactionType {
    Delivery,
    InStore,
}

#[derive(Serialize, Deserialize)]
struct Transaction {
  id: i32,
  trans_type: TransactionType,
  tax_percent: f64,
  total_price: f64,
  paid: Option<f64>,
  created_at: NaiveDateTime,
  created_by: String,
}

#[derive(Serialize, Deserialize)]
struct ProductInTransaction {
  id: i32,
  name: String,
  price: f64,
}

#[derive(Serialize, Deserialize)]
struct NewTransaction {
  trans_type: TransactionType,
  tax_percent: f64,
  total_price: f64,
  paid: Option<f64>,
  created_by: String,
}

#[derive(Serialize, Deserialize)]
struct NewProductInTransaction {
  transaction_id: String,
  product_id: String,
  count: i32,
}

#[get("/")]
async fn list() -> Json<Vec<Transaction>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let transactions = sqlx::query_as!(Transaction, r#"SELECT id, trans_type::transaction_type AS "trans_type!: TransactionType", tax_percent, total_price, paid, created_at, created_by FROM transaction"#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(transactions)
}

#[post("/", format = "json", data = "<new_transaction>")]
async fn create(new_transaction: Json<NewTransaction>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query!(
    r#"INSERT INTO transaction 
    (trans_type, tax_percent, total_price, paid, created_by) 
    VALUES ($1, $2, $3, $4, $5)"#,
    &new_transaction.trans_type as &TransactionType,
    new_transaction.tax_percent, 
    new_transaction.total_price,
    new_transaction.paid.as_ref(),
    new_transaction.created_by
  )
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

#[get("/products/<trans_id>")]
async fn list_products_in_transaction(trans_id: i32) -> Json<Vec<ProductInTransaction>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let products: Vec<ProductInTransaction> = sqlx::query_as!(
    ProductInTransaction,
    r#"SELECT product_id, name, unit_price
    FROM product_in_transaction
    WHERE transaction_id = $1"#,
    trans_id
  )
  .fetch_all(connection.as_mut())
  .await
  .unwrap();
  Json::from(products)
}

#[post("/products/<trans_id>/product", format = "json", data = "<new_product_in_transaction>")]
async fn add_product_in_transaction(trans_id: i32, new_product_in_transaction: Json<NewProductInTransaction>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;

  let mut product_name = sqlx::query_as!(
    String, 
    r#"SELECT name FROM product WHERE id = $1"#, new_product_in_transaction.product_id);
  
  let mut price = sqlx::query!(
      r#"SELECT price FROM product WHERE id = $1"#, new_product_in_transaction.product_id);
  
  let result = sqlx::query!(
    r#"INSERT INTO product_in_transaction 
    (transaction_id, product_id, name, unit_price, count, total_price) 
    VALUES ($1, $2, $3, $4, $5, $6)"#,
    trans_id,
    new_product_in_transaction.product_id,
    product_name,
    price,
    new_product_in_transaction.count,
    (price * new_product_in_transaction.count)
  )
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn transaction_routes() -> Vec<Route> {
  routes![list, create, list_products_in_transaction, add_product_in_transaction]
}