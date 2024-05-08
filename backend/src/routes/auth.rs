use rocket::{http::Status, serde::json::Json, Route};
use serde::Deserialize;
use uuid::Uuid;

use crate::{data::auth::StrippedAccount, guards::AccessGuard, CONNECION};

#[derive(Deserialize)]
struct AccessInput {
  token: String,
}

#[derive(Deserialize)]
struct LoginInput {
  username: String,
  password: String,
}

#[post("/access", format = "json", data = "<access>")]
async fn access(access: Json<AccessInput>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let count = sqlx::query!(
    "SELECT COUNT(*) AS count FROM access_token WHERE name = $1",
    access.token
  )
  .fetch_one(&mut *connection)
  .await
  .unwrap()
  .count
  .or(Some(0))
  .unwrap();
  if count == 1 {
    Status::Ok
  } else {
    Status::Unauthorized
  }
}

#[post("/login", format = "json", data = "<cred>")]
async fn login(
  cred: Json<LoginInput>,
  _access: AccessGuard,
) -> Result<Json<String>, Status> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let account = sqlx::query!(
    "SELECT pass_hash FROM account WHERE username = $1",
    cred.username,
  )
  .fetch_optional(&mut *connection)
  .await
  .unwrap();

  if account.is_none() {
    return Err(Status::Unauthorized);
  }
  let account = account.unwrap();
  if !bcrypt::verify(cred.password.clone(), &account.pass_hash).unwrap() {
    return Err(Status::Unauthorized);
  }

  let session_id = Uuid::new_v4().to_string();
  sqlx::query!(
    "INSERT INTO session (id, account_username) VALUES ($1, $2)",
    session_id,
    cred.username
  )
  .execute(&mut *connection)
  .await
  .unwrap();
  Ok(Json(session_id))
}

#[get("/accounts")]
async fn list(_access: AccessGuard) -> Json<Vec<StrippedAccount>> {
  let mut db = CONNECION.get().unwrap().lock().await;
  let accounts = sqlx::query!("SELECT username, display_name FROM account")
    .fetch_all(&mut *db)
    .await
    .unwrap();
  let stripped_accounts: Vec<_> = accounts
    .iter()
    .map(|account| StrippedAccount {
      username: account.username.clone(),
      display_name: account.display_name.clone(),
    })
    .collect();
  Json::from(stripped_accounts)
}

pub(super) fn auth_routes() -> Vec<Route> {
  routes![access, login, list]
}
