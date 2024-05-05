import {invoke} from "@tauri-apps/api";

export async function printerList(): Promise<string[]> {
  return await invoke("printer_list");
}