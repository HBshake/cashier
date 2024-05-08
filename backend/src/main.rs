#[macro_use]
extern crate rocket;

pub mod data;
pub mod db;
pub mod guards;
mod routes;

use routes::InitializeRoutes;

#[launch]
async fn rocket() -> _ {
  db::init().await;
  rocket::build().initialize_routes()
}
