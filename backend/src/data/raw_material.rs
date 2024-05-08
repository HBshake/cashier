use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct RawMaterial {
  pub id: i32,
  pub name: String,
  pub unit_price: f64,
  pub unit_name: Option<String>,
  pub created_at: NaiveDateTime,
}