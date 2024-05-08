use chrono::NaiveDateTime;
use rocket::{serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Product {
  id: i32,
  name: String,
  barcode: Option<String>,
  price: f64,
  created_at: NaiveDateTime,
}


#[get("/")]
async fn list() -> Json<Vec<Product>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let products = sqlx::query_as!(Product, r#"SELECT * FROM product"#)
    .fetch_all(connection.as_mut())
    .await
    .unwrap();
  Json::from(products)
}
pub(super) fn product_routes() -> Vec<Route> {
  routes![list]
}
