use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Employee {
  pub id: i32,
  pub name: String,
  pub created_at: NaiveDateTime,
}
