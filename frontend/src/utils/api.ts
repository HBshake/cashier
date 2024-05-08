import { Body, ResponseType, fetch } from "@tauri-apps/api/http";
import { SERVER_URL } from "./env";
import { configGet } from "./config";

let currentSession: string | null = null;

export const cashierApi = {
  async get<T>(path: string) {
    const accessToken = await configGet("access_token");
    if(!accessToken) {
      console.warn("Making request without an access token");
    }
    if(!currentSession) {
      console.warn("Making request without having a session");
    }
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "GET",
      responseType: ResponseType.JSON,
      headers: {
        "X-Access-Token": accessToken ?? "",
        "X-Session": currentSession ?? "",
      }
    });
  },
  async post<T>(path: string) {
    const accessToken = await configGet("access_token");
    if(!accessToken) {
      console.warn("Making request without an access token");
    }
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "POST",
      responseType: ResponseType.JSON,
      headers: {
        "X-Access-Token": accessToken ?? "",
        "X-Session": currentSession ?? "",
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
  },
  async login(username: string, password: string): Promise<boolean> {
    currentSession = null;
    try {
      const url = new URL("/auth/login", SERVER_URL).href;
      const accessToken = await configGet("access_token");
      if(!accessToken) {
        console.warn("Logging in without an access token");
      }
      const response = await fetch<string>(url, {
        method: "POST",
        body: Body.json({
          username,
          password,
        }),
        headers: {
          "X-Access-Token": accessToken ?? "",
        }
      });

      if(response.status !== 200) {
        return false;
      }
      currentSession = response.data;
      return true;
    } catch(e) {
      return false;
    }
  }
};