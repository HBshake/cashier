import { useEffect, useState } from "react";
import { cashierApi } from "../utils/api";

export function useRequest<T>(path: string):
  [
    T | undefined,
    React.Dispatch<React.SetStateAction<T | undefined>>,
    boolean
  ] {
  const [val, setVal] = useState<T | undefined>();
  const [error, setError] = useState(false);
  useEffect(() => {
    async function load() {
      const response = await cashierApi.get<T>(path);
      if (response.ok) {
        setVal(response.data);
      } else {
        setError(true);
      }

    }
    void load();
  }, []);

  return [val, setVal, error];
}