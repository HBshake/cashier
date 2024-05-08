use rocket::{
  http::Status,
  outcome::Outcome,
  request::{self, FromRequest},
  Request,
};

use crate::db;

pub struct AccessGuard {
  token: String,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AccessGuard {
  type Error = ();
  async fn from_request(
    request: &'r Request<'_>,
  ) -> request::Outcome<Self, Self::Error> {
    let access_token = request.headers().get("X-Access-Token").next();
    if access_token.is_none() {
      return Outcome::Error((Status::Unauthorized, ()));
    }
    let mut connection = db::get_connection().await;
    let access_token = access_token.unwrap();
    let token_result =
      sqlx::query!("SELECT * FROM access_token WHERE name = $1", access_token)
        .fetch_optional(&mut *connection)
        .await
        .unwrap();

    if token_result.is_none() {
      Outcome::Error((Status::Unauthorized, ()))
    } else {
      Outcome::Success(AccessGuard {
        token: access_token.to_string(),
      })
    }
  }
}

pub struct AuthGuard {
  username: String,
  display_name: String,
  perms: Vec<String>,
  token: String,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthGuard {
  type Error = ();
  async fn from_request(
    request: &'r Request<'_>,
  ) -> request::Outcome<Self, Self::Error> {
    // AuthGuard implies AccessGuard
    let access = AccessGuard::from_request(request).await;
    if !access.is_success() {
      return Outcome::Error((Status::Unauthorized, ()));
    }
    let access = access.unwrap();
    let session_id = request.headers().get("X-Session").next();
    if session_id.is_none() {
      return Outcome::Error((Status::Unauthorized, ()));
    }
    let mut connection = db::get_connection().await;
    let session_id = session_id.unwrap();
    let account = sqlx::query!(
      r#"SELECT username, display_name, perms, logout_time
        FROM (session JOIN account ON account_username = account.username)
        WHERE session.id = $1"#,
      session_id
    )
    .fetch_optional(&mut *connection)
    .await
    .unwrap();

    if account.is_none() {
      Outcome::Error((Status::Unauthorized, ()))
    } else {
      let account = account.unwrap();
      if account.logout_time.is_some() {
        // Already logged out
        return Outcome::Error((Status::Unauthorized, ()));
      }
      Outcome::Success(AuthGuard {
        username: account.username,
        display_name: account.display_name,
        perms: account.perms,
        token: access.token,
      })
    }
  }
}
