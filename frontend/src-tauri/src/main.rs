#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use standard_paths::{LocationType, StandardPaths};
use std::{fs, path::PathBuf, sync::OnceLock};

static CONFIG_PATH: OnceLock<PathBuf> = OnceLock::new();

fn main() {
  let sp = StandardPaths::new("cashier", "tartelette");
  let config_path = CONFIG_PATH.get_or_init(|| {
    sp.writable_location(LocationType::AppConfigLocation)
      .expect("Could not find app configuration directory")
  });
  fs::create_dir_all(config_path)
    .expect("Could not create app config directory");

  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("Could not start application");
}
