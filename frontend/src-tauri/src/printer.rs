#[tauri::command]
pub async fn printer_list() -> Vec<String> {
  ["Printer 1", "Printer 2"]
    .iter()
    .map(|s| s.to_string())
    .collect()
}
