#[macro_use]
extern crate rocket;

mod routes;

use routes::InitializeRoutes;

#[launch]
fn rocket() -> _ {
  rocket::build().initialize_routes()
}
