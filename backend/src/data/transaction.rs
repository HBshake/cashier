use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum TransactionType {
  Delivery,
  InStore,
}

#[derive(Serialize, Deserialize)]
pub struct Transaction {
  pub id: i32,
  pub ttype: String,
  pub tax_percent: f64,
  pub total_price: f64,
  pub paid: Option<f64>,
  pub created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionDetail {
  pub id: i32,
  pub ttype: String,
  pub tax_percent: f64,
  pub total_price: f64,
  pub paid: Option<f64>,
  pub created_at: NaiveDateTime,
  pub products: Vec<ProductInTransaction>,
}

#[derive(Serialize, Deserialize)]
pub struct ProductInTransaction {
  pub id: i32,
  pub unit_price: f64,
  pub count: i32,
  pub total_price: f64,
}