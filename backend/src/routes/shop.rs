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

#[derive(Serialize, Deserialize)]
struct RawMaterialInShop {
  id: i32,
  name: String,
  unit_price: f64,
  unit_name: Option<String>,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewRawMaterialInShop {
  raw_material_id: i32,
  shop_id: i32,
  stock: f64,
}

#[derive(Serialize, Deserialize)]
struct ProductInShop {
  id: i32,
  name: String,
  barcode: Option<String>,
  price: f64,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewProductInShop {
  product_id: i32,
  shop_id: i32,
  stock: i32,
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


#[get("/raw-materials/<id>")]
async fn list_raw_materials_in_shop(id: i32) -> Json<Vec<RawMaterialInShop>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let raw_materials: Vec<RawMaterialInShop> = sqlx::query_as!(
    RawMaterialInShop,
    r#"SELECT id, name, unit_price, unit_name, created_at
    FROM raw_materials_in_shop JOIN raw_material ON id = raw_material_id 
    WHERE shop_id = $1"#,
    id
  )
  .fetch_all(connection.as_mut())
  .await
  .unwrap();
  Json::from(raw_materials)
}

#[post("/raw-materials/<shop_id>/raw-material", format = "json", data = "<new_raw_material_in_shop>")]
async fn add_raw_material_in_shop(shop_id: i32, new_raw_material_in_shop: Json<NewRawMaterialInShop>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  
  let result = sqlx::query!(
    r#"INSERT INTO raw_materials_in_shop
    (raw_material_id, shop_id, stock) 
    VALUES ($1, $2, $3)"#,
    new_raw_material_in_shop.raw_material_id,
    shop_id,
    new_raw_material_in_shop.stock
  )
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

#[get("/products/<id>")]
async fn list_products_in_shop(id: i32) -> Json<Vec<ProductInShop>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let products: Vec<ProductInShop> = sqlx::query_as!(
    ProductInShop,
    r#"SELECT id, name, barcode, price, created_at
    FROM products_in_shop JOIN product ON id = product_id 
    WHERE shop_id = $1"#,
    id
  )
  .fetch_all(connection.as_mut())
  .await
  .unwrap();
  Json::from(products)
}

#[post("/products/<shop_id>/product", format = "json", data = "<new_product_in_shop>")]
async fn add_product_in_shop(shop_id: i32, new_product_in_shop: Json<NewProductInShop>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  
  let result = sqlx::query!(
    r#"INSERT INTO products_in_shop
    (product_id, shop_id, stock) 
    VALUES ($1, $2, $3)"#,
    new_product_in_shop.product_id,
    shop_id,
    new_product_in_shop.stock
  )
  .execute(connection.as_mut())
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn shop_routes() -> Vec<Route> {
  routes![list, create, list_raw_materials_in_shop, add_raw_material_in_shop, list_products_in_shop, add_product_in_shop]
}
