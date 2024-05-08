use crate::guards::AuthGuard;
use crate::CONNECION;
use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Product {
  id: i32,
  name: String,
  barcode: Option<String>,
  price: f64,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewProduct {
  name: String,
  barcode: Option<String>,
  price: f64,
}

#[derive(Serialize, Deserialize)]
struct RawMaterialInProduct {
  id: i32,
  name: String,
  unit_price: f64,
  unit_name: Option<String>,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewRawMaterialInProduct {
  raw_material_id: i32,
  product_id: i32,
  quantity_per_unit: f64,
}

#[get("/")]
async fn list(_auth: AuthGuard) -> Json<Vec<Product>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let products = sqlx::query_as!(Product, r#"SELECT * FROM product"#)
    .fetch_all(&mut *connection)
    .await
    .unwrap();
  Json::from(products)
}

#[post("/", format = "json", data = "<new_product>")]
async fn create(new_product: Json<NewProduct>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  sqlx::query!(
    r#"INSERT INTO product 
    (name, barcode, price) 
    VALUES ($1, $2, $3)"#,
    new_product.name,
    new_product.barcode,
    new_product.price
  )
  .execute(&mut *connection)
  .await
  .unwrap();
  Status::Created
}

#[get("/raw-material/<id>")]
async fn list_raw_materials(id: i32) -> Json<Vec<RawMaterialInProduct>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let raw_materials: Vec<RawMaterialInProduct> = sqlx::query_as!(
    RawMaterialInProduct,
    r#"SELECT id, name, unit_price, unit_name, created_at
    FROM raw_material_in_product JOIN raw_material ON id = raw_material_id 
    WHERE product_id = $1"#,
    id
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();
  Json::from(raw_materials)
}

#[post(
  "/raw-material/<product_id>/raw-materials",
  format = "json",
  data = "<new_raw_material_in_product>"
)]
async fn add_raw_material_in_product(
  product_id: i32,
  new_raw_material_in_product: Json<NewRawMaterialInProduct>,
) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;

  sqlx::query!(
    r#"INSERT INTO raw_material_in_product 
    (raw_material_id, product_id, quantity_per_unit) 
    VALUES ($1, $2, $3)"#,
    new_raw_material_in_product.raw_material_id,
    product_id,
    new_raw_material_in_product.quantity_per_unit
  )
  .execute(&mut *connection)
  .await
  .unwrap();

  Status::Created
}

pub(super) fn product_routes() -> Vec<Route> {
  routes![
    list,
    create,
    list_raw_materials,
    add_raw_material_in_product
  ]
}
