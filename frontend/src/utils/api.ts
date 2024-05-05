import { Body, ResponseType, fetch } from "@tauri-apps/api/http";
import { SERVER_URL } from "./env";
import { configGet } from "./config";

export const cashierApi = {
  async get<T>(path: string) {
    const accessToken = await configGet("access_token");
    if(!accessToken) {
      console.log("Making request without an access token");
    }
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "GET",
      responseType: ResponseType.JSON,
      headers: {
        "X-Access-Token": accessToken,
      }
    });
  },
  async post<T>(path: string) {
    const accessToken = await configGet("access_token");
    if(!accessToken) {
      console.log("Making request without an access token");
    }
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "POST",
      responseType: ResponseType.JSON,
      headers: {
        "X-Access-Token": accessToken,
      }
    });
  },
  async verifyAccessToken(token: string): Promise<boolean> {
    try {
      const url = new URL("/auth/access", SERVER_URL).href;
      const response = await fetch(url, {
        method: "POST",
        body: Body.json({
          token,
        })
      });
      return response.status === 200;
    } catch(e) {
      return false;
    }
  }
};