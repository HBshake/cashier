use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Invoice {
  id: i32,
  year: i32, 
  created_at: NaiveDateTime,
  transaction_id: i32,
}

#[derive(Serialize, Deserialize)]
struct NewInvoice {
    year: i32, 
    transaction_id: i32,
    blob: Vec<u8>,
}

#[get("/")]
async fn list() -> Json<Vec<Invoice>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let invoices = sqlx::query_as!(Invoice, r#"SELECT id, year, created_at, transaction_id FROM invoice"#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(invoices)
}

#[post("/", format = "json", data = "<new_invoice>")]
async fn create(new_invoice: Json<NewInvoice>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query!(
    r#"INSERT INTO invoice 
    (year, blob, transaction_id) 
    VALUES ($1, $2, $3)"#,
    new_invoice.year,
    new_invoice.blob,
    new_invoice.transaction_id
  )
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn invoice_routes() -> Vec<Route> {
  routes![list, create]
}
