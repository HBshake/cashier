use crate::{data::employee::Employee, db, guards::AuthGuard};
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct CreateEmployeeInput {
  name: String,
}

#[get("/")]
async fn list(_auth: AuthGuard) -> Json<Vec<Employee>> {
  let mut connection = db::get_connection().await;
  let employees = sqlx::query_as!(Employee, r#"SELECT * FROM employee"#)
    .fetch_all(&mut *connection)
    .await
    .unwrap();
  Json::from(employees)
}

#[post("/", format = "json", data = "<input>")]
async fn create(_auth: AuthGuard, input: Json<CreateEmployeeInput>) -> Status {
  let mut connection = db::get_connection().await;
  sqlx::query!(r#"INSERT INTO employee (name) VALUES ($1)"#, input.name)
    .execute(&mut *connection)
    .await
    .unwrap();

  Status::Created
}

pub(super) fn employee_routes() -> Vec<Route> {
  routes![list, create]
}
