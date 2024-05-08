#[tauri::command]
pub fn printer_list() -> Vec<String> {
  if cfg!(debug_assertions) {
    ["Printer 1", "Printer 2"]
      .iter()
      .map(|name| name.to_string())
      .collect()
  } else {
    printers::get_printers()
      .iter()
      .map(|printer| printer.name.clone())
      .collect()
  }
}
