use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{data::auth::{Session, StrippedAccount}, db, guards::{AccessGuard, AuthGuard}};

#[derive(Deserialize)]
struct AccessInput {
  token: String,
}

#[derive(Deserialize)]
struct LoginInput {
  username: String,
  password: String,
}

#[derive(Serialize)]
struct LoginOutput {
  session_id: String,
  username: String,
  display_name: String,
  perms: Vec<String>,
}

#[post("/access", format = "json", data = "<access>")]
async fn access(access: Json<AccessInput>) -> Status {
  let mut connection = db::get_connection().await;
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
) -> Result<Json<LoginOutput>, Status> {
  let mut connection = db::get_connection().await;
  let account = sqlx::query!(
    "SELECT display_name, perms, pass_hash FROM account WHERE username = $1",
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
  Ok(Json(LoginOutput {
    session_id,
    username: cred.username.clone(),
    display_name: account.display_name,
    perms: account.perms,
  }))
}

#[get("/accounts")]
async fn list(_access: AccessGuard) -> Json<Vec<StrippedAccount>> {
  let mut connection = db::get_connection().await;
  let accounts = sqlx::query_as!(
    StrippedAccount,
    "SELECT username, display_name FROM account"
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();
  Json::from(accounts)
}

#[get("/session")]
async fn sessions(auth: AuthGuard) -> Json<Vec<Session>> {
  let mut connection = db::get_connection().await;
  let sessions = sqlx::query_as!(
    Session,
    "SELECT id, account_username, login_time, logout_time FROM session WHERE account_username = $1",
    auth.username
  )
  .fetch_all(&mut *connection)
  .await
  .unwrap();
  Json::from(sessions)
}

#[get("/logout")]
async fn logout(auth: AuthGuard) -> Status {
  let mut connection = db::get_connection().await;
  sqlx::query!(
    "UPDATE session SET logout_time = NOW() WHERE id = $1",
    auth.session_id
  )
  .execute(&mut *connection)
  .await
  .unwrap();
  Status::Ok
}

pub(super) fn auth_routes() -> Vec<Route> {
  routes![access, login, logout, list, sessions]
}
