use crate::{data::raw_material::RawMaterial, db, guards::AuthGuard};
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct CreateRawMaterialInput {
  name: String,
  unit_price: f64,
  unit_name: Option<String>,
}

#[get("/")]
async fn list(_auth: AuthGuard) -> Json<Vec<RawMaterial>> {
  let mut connection = db::get_connection().await;
  let raw_materials =
    sqlx::query_as!(RawMaterial, r#"SELECT * FROM raw_material"#)
      .fetch_all(&mut *connection)
      .await
      .unwrap();
  Json::from(raw_materials)
}

#[post("/", format = "json", data = "<input>")]
async fn create(
  _auth: AuthGuard,
  input: Json<CreateRawMaterialInput>,
) -> Status {
  let mut connection = db::get_connection().await;
  sqlx::query!(
    r#"INSERT INTO raw_material 
    (name, unit_price, unit_name) 
    VALUES ($1, $2, $3)"#,
    input.name,
    input.unit_price,
    input.unit_name
  )
  .execute(&mut *connection)
  .await
  .unwrap();

  Status::Created
}

pub(super) fn raw_matrial_routes() -> Vec<Route> {
  routes![list, create]
}
