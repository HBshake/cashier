use crate::data::product::{ProductDetail, RawMaterialInProduct};
use crate::CONNECION;
use crate::{data::product::Product, guards::AuthGuard};
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct CreateProductInput {
  name: String,
  barcode: Option<String>,
  price: f64,
}

#[derive(Serialize, Deserialize)]
struct AddRawMaterialInput {
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

#[post("/", format = "json", data = "<input>")]
async fn create(input: Json<CreateProductInput>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  sqlx::query!(
    r#"INSERT INTO product 
    (name, barcode, price) 
    VALUES ($1, $2, $3)"#,
    input.name,
    input.barcode,
    input.price
  )
  .execute(&mut *connection)
  .await
  .unwrap();
  Status::Created
}

#[get("/<product_id>")]
async fn detail(product_id: i32) -> Json<ProductDetail> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let product = sqlx::query_as!(
    Product,
    r#"SELECT * FROM product WHERE id = $1"#,
    product_id
  )
  .fetch_one(&mut *connection)
  .await
  .unwrap();

  let raw_materials = sqlx::query_as!(
    RawMaterialInProduct,
    r#"SELECT raw_material_id, name, quantity_per_unit
    FROM raw_material_in_product JOIN raw_material ON raw_material_id = id
    WHERE product_id = $1"#,
    product_id
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();

  let detail = ProductDetail {
    id: product.id,
    name: product.name,
    barcode: product.barcode,
    price: product.price,
    created_at: product.created_at,
    raw_materials,
  };

  Json::from(detail)
}

#[patch("/<product_id>", format = "json", data = "<input>")]
async fn add_raw_material(
  product_id: i32,
  input: Json<AddRawMaterialInput>,
) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;

  sqlx::query!(
    r#"INSERT INTO raw_material_in_product 
    (raw_material_id, product_id, quantity_per_unit) 
    VALUES ($1, $2, $3)"#,
    input.raw_material_id,
    product_id,
    input.quantity_per_unit
  )
  .execute(&mut *connection)
  .await
  .unwrap();

  Status::Created
}

pub(super) fn product_routes() -> Vec<Route> {
  routes![list, create, detail, add_raw_material]
}
