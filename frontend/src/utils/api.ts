import { ResponseType, fetch } from "@tauri-apps/api/http";
import {SERVER_URL} from "./env";

export const cashierApi = {
  async get<T>(path: string) {
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "GET",
      responseType: ResponseType.JSON,
    });
  }
};