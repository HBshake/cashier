#[macro_use]
extern crate rocket;

pub mod data;
mod routes;

use std::{env, sync::OnceLock};

use rocket::tokio::sync::Mutex;
use routes::InitializeRoutes;
use sqlx::{Connection, PgConnection};

static CONNECION: OnceLock<Mutex<PgConnection>> = OnceLock::new();

#[launch]
async fn rocket() -> _ {
  let connection_url = env::var("DATABASE_URL")
    .expect("Could not find environment variable `DATABASE_URL`.");
  let connection = PgConnection::connect(&connection_url)
    .await
    .expect("Could not connect to database.");

  CONNECION.get_or_init(|| Mutex::new(connection));
  rocket::build().initialize_routes()
}
