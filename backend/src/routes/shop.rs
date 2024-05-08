use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::{
  data::shop::{ProductInShop, RawMaterialInShop, Shop},
  CONNECION,
};

#[derive(Serialize, Deserialize)]
struct CreateShopInput {
  name: String,
}


#[derive(Serialize, Deserialize)]
struct AddProductStockInput {
  product_id: i32,
  shop_id: i32,
  delta: i32,
}
#[derive(Serialize, Deserialize)]
struct AddRawMaterialStockInput {
  raw_material_id: i32,
  shop_id: i32,
  delta: f64,
}

#[get("/")]
async fn list() -> Json<Vec<Shop>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let shops = sqlx::query_as!(Shop, r#"SELECT * FROM shop"#)
    .fetch_all(&mut *connection)
    .await
    .unwrap();
  Json::from(shops)
}

#[post("/", format = "json", data = "<input>")]
async fn create(input: Json<CreateShopInput>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  sqlx::query!(r#"INSERT INTO shop (name) VALUES ($1)"#, input.name)
    .execute(&mut *connection)
    .await
    .unwrap();

  Status::Created
}

#[get("/<shop_id>/product")]
async fn product_stock(shop_id: i32) -> Json<Vec<ProductInShop>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let products: Vec<ProductInShop> = sqlx::query_as!(
    ProductInShop,
    r#"SELECT id, name, barcode, price, created_at
    FROM product_in_shop JOIN product ON id = product_id 
    WHERE shop_id = $1"#,
    shop_id
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();
  Json::from(products)
}
#[get("/<shop_id>/raw-material")]
async fn rawmat_stock(shop_id: i32) -> Json<Vec<RawMaterialInShop>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let raw_materials: Vec<RawMaterialInShop> = sqlx::query_as!(
    RawMaterialInShop,
    r#"SELECT raw_material.name, stock
    FROM raw_material_in_shop JOIN raw_material ON id = raw_material_id 
    WHERE shop_id = $1"#,
    shop_id
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();
  Json::from(raw_materials)
}

#[post("/<shop_id>/product", format = "json", data = "<input>")]
async fn add_product_stock(
  shop_id: i32,
  input: Json<AddProductStockInput>,
) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;

  let result = sqlx::query!(
    r#"UPDATE product_in_shop
    SET stock = stock + $1
    WHERE product_id = $2 AND shop_id = $3"#,
    input.delta,
    input.product_id,
    shop_id,
  )
  .execute(&mut *connection)
  .await
  .unwrap();

  if result.rows_affected() == 0 {
    return Status::NotFound;
  } else {
    return Status::Accepted;
  }
}
#[post("/<shop_id>/raw-material", format = "json", data = "<input>")]
async fn add_rawmat_stock(
  shop_id: i32,
  input: Json<AddRawMaterialStockInput>,
) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;

  let r = sqlx::query!(
    r#"UPDATE raw_material_in_shop
    SET stock = stock + $1
    WHERE raw_material_id = $2 AND shop_id = $3"#,
    input.delta,
    input.raw_material_id,
    shop_id,
  )
  .execute(&mut *connection)
  .await
  .unwrap();
  if r.rows_affected() == 0 {
    Status::NotFound
  } else {
    Status::Accepted
  }
}

pub(super) fn shop_routes() -> Vec<Route> {
  routes![
    list,
    create,
    product_stock,
    rawmat_stock,
    add_product_stock,
    add_rawmat_stock,
  ]
}
