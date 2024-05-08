use std::{env, sync::OnceLock};

use rocket::{
  request::{self, FromRequest, Outcome},
  tokio::sync::{Mutex, MutexGuard},
  Request,
};
use sqlx::{Connection, PgConnection};

static CONNECTION: OnceLock<Mutex<PgConnection>> = OnceLock::new();

pub async fn init() {
  let connection_url = env::var("DATABASE_URL")
    .expect("Could not find environment variable `DATABASE_URL`.");
  let connection = PgConnection::connect(&connection_url)
    .await
    .expect("Could not connect to database.");

  CONNECTION.get_or_init(|| Mutex::new(connection));
}

pub async fn get_connection<'a>() -> MutexGuard<'a, PgConnection> {
  CONNECTION.get().unwrap().lock().await
}
