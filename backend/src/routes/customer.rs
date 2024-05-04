use rocket::{serde::json::Json, Route};
use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Customer{
    id: i32,
    name: String,
    ice: Option<String>,
    rc: Option<String>, 
    delivery_address: Option<String>,
    phone: Option<String>,
    comment: Option<String>,
    created_at: NaiveDateTime,
}

#[get("/")]
async fn list() -> Json<Vec<Customer>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let customers = sqlx::query_as!(Customer, r#"SELECT * FROM customer"#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(customers)
}
pub(super) fn customer_routes() -> Vec<Route> {
  routes![list]
}
