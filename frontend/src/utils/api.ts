import { Body, ResponseType, fetch } from "@tauri-apps/api/http";
import { SERVER_URL } from "./env";
import { configGet, configSet } from "./config";

export const cashierApi = {
  async get<T>(path: string) {
    const accessToken = await configGet("access_token");
    const session = await configGet("session");
    if(!accessToken) {
      console.warn("Making request without an access token");
    }
    if(!session) {
      console.warn("Making request without having a session");
    }
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "GET",
      responseType: ResponseType.JSON,
      headers: {
        "X-Access-Token": accessToken ?? "",
        "X-Session": session ?? "",
      }
    });
  },
  async post<T>(path: string, body: any) {
    const accessToken = await configGet("access_token");
    const session = await configGet("session");
    if(!accessToken) {
      console.warn("Making request without an access token");
    }
    if(!session) {
      console.warn("Making request without having a session");
    }
    const url = new URL(path, SERVER_URL).href;
    return await fetch<T>(url, {
      method: "POST",
      responseType: ResponseType.JSON,
      headers: {
        "X-Access-Token": accessToken ?? "",
        "X-Session": session ?? "",
      },
      body: Body.json(body)
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
      await configSet("session", response.data);
      return true;
    } catch(e) {
      return false;
    }
  }
};