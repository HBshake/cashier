use standard_paths::{LocationType, StandardPaths};
use std::{
  collections::HashMap,
  fs::{self, File},
  path::PathBuf,
  sync::{OnceLock, RwLock},
};

static CONFIG_PATH: OnceLock<PathBuf> = OnceLock::new();
static CONFIG: OnceLock<RwLock<HashMap<String, String>>> = OnceLock::new();

pub(super) fn init() {
  let sp = StandardPaths::new("cashier", "tartelette");
  let config_dir = sp
    .writable_location(LocationType::AppConfigLocation)
    .expect("Could not find app configuration directory");
  fs::create_dir_all(config_dir.clone())
    .expect("Could not create app config directory");
  let config_path = CONFIG_PATH.get_or_init(|| config_dir.join("cashier.toml"));
  let _ = File::create_new(config_path);
  let config: HashMap<String, String> = toml::from_str(
    &fs::read_to_string(config_path)
      .expect("Could not read configuration file."),
  )
  .expect("Could not parse configuration file");
  CONFIG.get_or_init(|| RwLock::new(config));
}

#[tauri::command]
pub(super) async fn config_set(name: String, val: String) {
  let mut config = CONFIG.get().unwrap().write().unwrap();
  config.insert(name, val);
  config_save(&config);
}

#[tauri::command]
pub(super) async fn config_get(name: String) -> Option<String> {
  let config = CONFIG.get().unwrap().read().unwrap();
  config.get(&name).cloned()
}

#[tauri::command]
pub(super) async fn config_unset(name: String) {
  let mut config = CONFIG.get().unwrap().write().unwrap();
  config.remove(&name);
  config_save(&config);
}

fn config_save(config: &HashMap<String, String>) {
  let config_path = CONFIG_PATH.get().unwrap();
  fs::write(
    config_path,
    toml::to_string(config).expect("Could not write configuration"),
  )
  .expect("Could not write configuration file");
}
