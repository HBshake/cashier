import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

export function useNative<T>(command: string, params?: any): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [val, setVal] = useState<T>();

  useEffect(() => {
    async function loadVal() {
      setVal(await invoke(command, params));
    }
    void loadVal();
  }, []);

  return [val, setVal];
}
