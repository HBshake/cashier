use rocket::{Build, Rocket, Route};

use self::{
  auth::auth_routes, customer::customer_routes, employee::employee_routes,
  product::product_routes, raw_material::raw_matrial_routes, shop::shop_routes,
  transaction::transaction_routes,
};

mod auth;
mod customer;
mod employee;
mod product;
mod raw_material;
mod shop;
mod transaction;

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
    self
      .mount("/", root_routes())
      .mount("/auth", auth_routes())
      .mount("/customer", customer_routes())
      .mount("/product", product_routes())
      .mount("/raw_material", raw_matrial_routes())
      .mount("/invoice", shop_routes())
      .mount("/employee", employee_routes())
      .mount("/transaction", transaction_routes())
  }
}
