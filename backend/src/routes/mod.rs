use rocket::{Build, Rocket, Route};

use self::{auth::auth_routes, customer::customer_routes, employee::employee_routes, invoice::invoice_routes, product::product_routes, raw_material::raw_matrial_routes, shop::shop_routes, transaction::transaction_routes};

pub mod auth;
pub mod customer;
pub mod product;
pub mod raw_material;
pub mod shop;
pub mod employee;
pub mod transaction;
pub mod invoice;

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
      .mount("/invoice", invoice_routes())
  }
}
