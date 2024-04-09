#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
  "Cashier System Ready to go!"
}

#[launch]
fn rocket() -> _ {
  rocket::build().mount("/", routes![index])
}
