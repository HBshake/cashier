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
struct NewTransaction {
  trans_type: TransactionType,
  tax_percent: f64,
  total_price: f64,
  paid: Option<f64>,
  created_by: String,
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

pub(super) fn transaction_routes() -> Vec<Route> {
  routes![list, create]
}