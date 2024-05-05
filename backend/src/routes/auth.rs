use rocket::{http::Status, serde::json::Json, Route};
use serde::Deserialize;

use crate::{data::auth::AccessToken, CONNECION};

#[derive(Deserialize)]
struct AccessInput {
  token: String,
}

#[post("/access", format = "json", data = "<access>")]
async fn access(access: Json<AccessInput>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let token = sqlx::query_as!(
    AccessToken,
    "SELECT * FROM access_token WHERE name = $1",
    access.token
  )
  .fetch_optional(&mut *connection)
  .await
  .unwrap();
  match token {
    Some(_) => Status::Ok,
    None => Status::Unauthorized,
  }
}

#[get("/login")]
pub fn login() -> &'static str {
  "Cashier API"
}

pub(super) fn auth_routes() -> Vec<Route> {
  routes![access, login]
}
