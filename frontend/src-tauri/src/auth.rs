use std::sync::Mutex;

#[tauri::command]
pub fn login(username: String, password: String) -> Result<String, String> {
  static COUNTER: Mutex<usize> = Mutex::new(0);
  let mut counter = COUNTER.lock().unwrap();
  *counter += 1;

  println!("Login: {username}:{password}");

  match *counter % 2 {
    0 => Ok("Goodluck".into()),
    _ => Err("No luck".into())
  }
}