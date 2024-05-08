use rocket::{http::Status, serde::json::Json, Route};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
  data::auth::{AccessToken, Account, StrippedAccount},
  CONNECION,
};

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

#[post("/login", format = "json", data = "<cred>")]
async fn login(cred: Json<LoginInput>) -> Result<Json<String>, Status> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let account = sqlx::query_as!(
    Account,
    "SELECT * FROM account WHERE username = $1",
    cred.username,
  )
  .fetch_optional(&mut *connection)
  .await
  .unwrap();

  if account.is_none() {
    return Err(Status::Unauthorized);
  }
  let account = account.unwrap();
  println!("{}", account.pass_hash);
  println!("{}", cred.password);
  if !bcrypt::verify(cred.password.clone(), &account.pass_hash).unwrap() {
    println!("Invalid login");
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
async fn list() -> Json<Vec<StrippedAccount>> {
  let mut db = CONNECION.get().unwrap().lock().await;
  let accounts = sqlx::query_as!(Account, "SELECT * FROM account")
    .fetch_all(&mut *db)
    .await
    .unwrap();
  let stripped_accounts: Vec<_> = accounts
    .iter()
    .map(|account| StrippedAccount::from(account))
    .collect();
  Json::from(stripped_accounts)
}

pub(super) fn auth_routes() -> Vec<Route> {
  routes![access, login, list]
}
