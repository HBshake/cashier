use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Customer {
  pub id: i32,
  pub name: String,
  pub ice: Option<String>,
  pub rc: Option<String>,
  pub delivery_address: Option<String>,
  pub phone: Option<String>,
  pub comment: Option<String>,
  pub created_at: NaiveDateTime,
}
