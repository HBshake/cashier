use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Customer {
  id: i32,
  name: String,
  ice: Option<String>,
  rc: Option<String>,
  delivery_address: Option<String>,
  phone: Option<String>,
  comment: Option<String>,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewCustomer {
  name: String,
  ice: Option<String>,
  rc: Option<String>,
  delivery_address: Option<String>,
  phone: Option<String>,
  comment: Option<String>,
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

#[post("/", format = "json", data = "<new_customer>")]
async fn create(new_customer: Json<NewCustomer>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query!(
    r#"INSERT INTO customer 
    (name, ice, rc, delivery_address, phone, comment) 
    VALUES ($1, $2, $3, $4, $5, $6)"#,
    new_customer.name,
    new_customer.ice,
    new_customer.rc,
    new_customer.delivery_address,
    new_customer.phone,
    new_customer.comment
  )
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn customer_routes() -> Vec<Route> {
  routes![list, create]
}
