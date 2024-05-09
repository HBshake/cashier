use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum TransactionType {
  Delivery,
  InStore,
}

impl Into<TransactionType> for String {
  fn into(self) -> TransactionType {
    match self.as_str() {
      "Delivery" => TransactionType::Delivery,
      "InStore" => TransactionType::InStore,
      _ => TransactionType::InStore,
    }
  }
}

impl Into<String> for TransactionType {
  fn into(self) -> String {
    match self {
      TransactionType::Delivery => "Delivery".to_string(),
      TransactionType::InStore => "InStore".to_string(),
    }
  }
}

#[derive(Serialize, Deserialize)]
pub struct Transaction {
  pub id: i32,
  pub ttype: TransactionType,
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
  pub name: String,
  pub unit_price: f64,
  pub count: i32,
  pub total_price: f64,
}