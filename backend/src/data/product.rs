use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Product {
  pub id: i32,
  pub name: String,
  pub barcode: Option<String>,
  pub price: f64,
  pub created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
pub struct ProductDetail {
  pub id: i32,
  pub name: String,
  pub barcode: Option<String>,
  pub price: f64,
  pub created_at: NaiveDateTime,
  pub raw_materials: Vec<RawMaterialInProduct>,
}

#[derive(Serialize, Deserialize)]
pub struct RawMaterialInProduct {
  pub raw_material_id: i32,
  pub name: String,
  pub quantity_per_unit: f64,
}
