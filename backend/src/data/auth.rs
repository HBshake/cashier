use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct StrippedAccount {
  pub username: String,
  pub display_name: String,
}

#[derive(Serialize, Deserialize)]
pub struct Session {
  pub id: String,
  pub account_username: String,
  pub login_time: NaiveDateTime,
  pub logout_time: Option<NaiveDateTime>,
}
