use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct AccessToken {
  pub name: String,
  pub created_at: NaiveDateTime,
}