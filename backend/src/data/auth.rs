use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct AccessToken {
  pub name: String,
  pub created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
pub struct Account {
  pub username: String,
  pub display_name: String,
  pub pass_hash: String,
  pub perms: Vec<String>,
  pub created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
pub struct StrippedAccount {
  pub username: String,
  pub display_name: String,
  pub created_at: NaiveDateTime,
}

impl From<&Account> for StrippedAccount {
  fn from(value: &Account) -> Self {
    Self {
      username: value.username.clone(),
      display_name: value.display_name.clone(),
      created_at: value.created_at,
    }
  }
}

#[derive(Serialize, Deserialize)]
pub struct Session {
  pub id: String,
  pub account_username: String,
  pub login_time: NaiveDateTime,
  pub logout_time: Option<NaiveDateTime>,
}
