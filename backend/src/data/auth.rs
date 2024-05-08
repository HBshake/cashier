use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct StrippedAccount {
  pub username: String,
  pub display_name: String,
}
