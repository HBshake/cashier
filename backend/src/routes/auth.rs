use rocket::Route;

#[get("/login")]
pub fn login() -> &'static str {
  "Cashier API"
}

pub(super) fn auth_routes() -> Vec<Route> {
  routes![login]
}
