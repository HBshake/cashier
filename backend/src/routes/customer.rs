use rocket::{serde::json::Json, Route};
use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Customer{
    id: i32,
    name: String,
    ICE: Option<String>,
    RC: Option<String>, 
    deliveryAddress: Option<String>,
    phone: Option<String>,
    comment: Option<String>,
    createdAt: NaiveDateTime,
}

#[get("/")]
async fn list() -> Json<Vec<Customer>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let customers = sqlx::query_as!(Customer, r#"SELECT * FROM "Customer""#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(customers)
}
pub(super) fn customer_routes() -> Vec<Route> {
  routes![list]
}
