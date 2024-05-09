use crate::{data::customer::Customer, db, guards::AuthGuard};
use rocket::{
  response::status::{Accepted, BadRequest, Created},
  serde::json::Json,
  Route,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct CreateCustomerInput {
  name: String,
  ice: Option<String>,
  rc: Option<String>,
  delivery_address: Option<String>,
  phone: Option<String>,
  comment: Option<String>,
}

#[get("/")]
async fn list(_auth: AuthGuard) -> Json<Vec<Customer>> {
  let mut connection = db::get_connection().await;
  let customers = sqlx::query_as!(Customer, r#"SELECT * FROM customer"#)
    .fetch_all(&mut *connection)
    .await
    .unwrap();
  Json::from(customers)
}

#[post("/", format = "json", data = "<input>")]
async fn create(
  _auth: AuthGuard,
  input: Json<CreateCustomerInput>,
) -> Result<Accepted<()>, BadRequest<String>> {
  if input.name.is_empty() {
    println!("Empty name");
    return Err(BadRequest("Nom Invalide".into()));
  }
  let mut connection = db::get_connection().await;
  sqlx::query!(
    r#"INSERT INTO customer 
    (name, ice, rc, delivery_address, phone, comment) 
    VALUES ($1, $2, $3, $4, $5, $6)"#,
    input.name,
    input.ice,
    input.rc,
    input.delivery_address,
    input.phone,
    input.comment
  )
  .execute(&mut *connection)
  .await
  .unwrap();

  Ok(Accepted(()))
}

pub(super) fn customer_routes() -> Vec<Route> {
  routes![list, create]
}
