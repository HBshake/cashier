use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Shop {
  pub id: i32,
  pub name: String,
  pub created_at: NaiveDateTime,
}
#[derive(Serialize, Deserialize)]
pub struct ProductInShop {
  pub id: i32,
  pub name: String,
  pub barcode: Option<String>,
  pub price: f64,
  pub created_at: NaiveDateTime,
}
#[derive(Serialize, Deserialize)]
pub struct RawMaterialInShop {
  pub name: String,
  pub stock: f64,
}
