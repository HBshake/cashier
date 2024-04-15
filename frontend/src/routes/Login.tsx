import { invoke } from "@tauri-apps/api";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(async () => {
    try {
      const result = await invoke("login", { username, password });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }, [username, password]);

  return (
    <>
      <h1>Login</h1>

      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button onClick={() => void login()}>Login</button>

      <Link to='/hardware-cfg' about='frfr'>
        Back
      </Link>
    </>
  );
}
