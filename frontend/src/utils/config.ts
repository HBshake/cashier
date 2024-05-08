import { invoke } from "@tauri-apps/api";

export async function configSet(name: string, val: string) {
  await invoke("config_set", {name, val});
}

export async function configGet(name: string): Promise<string | null> {
  return await invoke("config_get", {name});
}

export async function configUnset(name: string) {
  await invoke("config_unset", {name});
}
