#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod printer;

fn main() {
  config::init();
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      printer::printer_list,
      config::config_get,
      config::config_set,
      config::config_unset,
    ])
    .run(tauri::generate_context!())
    .expect("Could not start application");
}
