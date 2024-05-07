use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Shop {
  id: i32,
  name: String,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewShop {
    name: String,
}

#[get("/")]
async fn list() -> Json<Vec<Shop>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let shops = sqlx::query_as!(Shop, r#"SELECT * FROM shop"#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(shops)
}

#[post("/", format = "json", data = "<new_shop>")]
async fn create(new_shop: Json<NewShop>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query!(r#"INSERT INTO shop (name) VALUES ($1)"#, new_shop.name)
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn shop_routes() -> Vec<Route> {
  routes![list, create]
}
