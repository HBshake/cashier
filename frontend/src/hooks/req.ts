import { useEffect, useState } from "react";
import { cashierApi } from "../utils/api";

export function useRequest<T>(path: string): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [val, setVal] = useState<T | undefined>();
  useEffect(() => {
    async function load() {
      setVal((await cashierApi.get<T>(path)).data);
    }
    void load();
  }, []);

  return [val, setVal];
}