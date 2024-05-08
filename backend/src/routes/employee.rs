use chrono::NaiveDateTime;
use rocket::{http::Status, serde::json::Json, Route};
use serde::{Deserialize, Serialize};

use crate::CONNECION;

#[derive(Serialize, Deserialize)]
struct Employee {
  id: i32,
  name: String,
  created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]
struct NewEmployee {
    name: String,
}

#[get("/")]
async fn list() -> Json<Vec<Employee>> {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let employees = sqlx::query_as!(Employee, r#"SELECT * FROM employee"#)
    .fetch_all(&mut *connection)
    .await
    .unwrap();
  Json::from(employees)
}

#[post("/", format = "json", data = "<new_employee>")]
async fn create(new_employee: Json<NewEmployee>) -> Status {
  let mut connection = CONNECION.get().unwrap().lock().await;
  let result = sqlx::query!(r#"INSERT INTO employee (name) VALUES ($1)"#, new_employee.name)
  .execute(&mut *connection)
  .await;

  match result {
    Ok(_) => Status::Created,
    Err(_) => Status::BadRequest,
  }
}

pub(super) fn employee_routes() -> Vec<Route> {
  routes![list, create]
}
