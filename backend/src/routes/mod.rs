use rocket::{Build, Rocket, Route};

use self::auth::auth_routes;

pub mod auth;

#[get("/")]
fn index() -> &'static str {
  "Cashier System Ready to go!"
}

fn root_routes() -> Vec<Route> {
  routes![index]
}

pub trait InitializeRoutes {
  fn initialize_routes(self) -> Self;
}
impl InitializeRoutes for Rocket<Build> {
  fn initialize_routes(self) -> Self {
    self.mount("/", root_routes()).mount("/auth", auth_routes())
  }
}
