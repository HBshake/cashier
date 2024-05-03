#[macro_use]
extern crate rocket;

mod routes;

use std::sync::OnceLock;

use rocket::tokio::sync::Mutex;
use routes::InitializeRoutes;
use sqlx::{Connection, PgConnection};

static CONNECION: OnceLock<Mutex<PgConnection>> = OnceLock::new();

#[launch]
async fn rocket() -> _ {
  let connection = PgConnection::connect(
    "postgres://postgres:000C000H000A@localhost:5432/cashierdb",
  )
  .await
  .unwrap();

  CONNECION.get_or_init(|| Mutex::new(connection));
  rocket::build().initialize_routes()
}
