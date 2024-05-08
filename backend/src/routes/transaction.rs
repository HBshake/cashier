use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize, Debug, Clone, Copy, PartialEq)]
pub enum TransactionType {
    Delivery,
    InStore,
    Unknown,
}

impl From<i32> for TransactionType {
  fn from(item: i32) -> Self {
      match item {
          1 => TransactionType::Delivery,
          2 => TransactionType::InStore,
          _ => TransactionType::Unknown,
      }
  }
}

impl Into<i32> for TransactionType {
  fn into(self) -> i32 {
      match self {
          TransactionType::Delivery => 1,
          TransactionType::InStore => 2,
          TransactionType::Unknown => 0,
      }
  }
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
  let transactions = sqlx::query_as!(Transaction, r#"SELECT id, trans_type, tax_percent, total_price, paid, created_at, created_by FROM transaction"#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(transactions)
}

#[post("/", format = "json", data = "<new_transaction>")]
async fn create(new_transaction: Json<NewTransaction>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query_as!(NewTransaction,
    r#"INSERT INTO transaction 
    (trans_type, tax_percent, total_price, paid, created_by) 
    VALUES ($1, $2, $3, $4, $5)"#,
    new_transaction.trans_type.into(),
    new_transaction.tax_percent, 
    new_transaction.total_price,
    new_transaction.paid,
    new_transaction.created_by
  )
  .execute(connection.as_mut())
  .await
  .unwrap()
  .into_iter()
  .map(|row| Transaction {
    id: row.get(0),
    trans_type: TransactionType::from(row.get::<i32, _>(1)),  // Convert from i32
    tax_percent: row.get(2),
    total_price: row.get(3),
    paid: row.get(4),
    created_at: row.get(5),
    created_by: row.get(6),
})
.collect();

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn transaction_routes() -> Vec<Route> {
  routes![list, create]
}
