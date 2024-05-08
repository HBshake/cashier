use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct RawMaterial {
  id: i32,
  name: String,
  unit_price: f64,
  unit_name: Option<String>,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewRawMaterial {
  name: String,
  unit_price: f64,
  unit_name: Option<String>,
}

#[get("/")]
async fn list() -> Json<Vec<RawMaterial>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let raw_materials = sqlx::query_as!(RawMaterial, r#"SELECT * FROM raw_material"#)
    .fetch_all(&mut *connection)
    .await
    .unwrap();
  Json::from(raw_materials)
}

#[post("/", format = "json", data = "<new_raw_material>")]
async fn create(new_raw_material: Json<NewRawMaterial>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query!(
    r#"INSERT INTO raw_material 
    (name, unit_price, unit_name) 
    VALUES ($1, $2, $3)"#,
    new_raw_material.name,
    new_raw_material.unit_price,
    new_raw_material.unit_name
  )
  .execute(&mut *connection)
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn raw_matrial_routes() -> Vec<Route> {
  routes![list, create]
}
