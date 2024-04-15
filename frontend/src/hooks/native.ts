import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

export function useNative<T>(command: string): T | undefined {
  const [val, setVal] = useState<T>();

  useEffect(() => {
    async function loadVal() {
      setVal(await invoke(command));
    }
    void loadVal();
  });

  return val;
}
