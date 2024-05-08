import { useCallback, useState } from "react";
import { useDict } from "../../hooks/locale";
import { cashierApi } from "../../utils/api";
import { configSet } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

export default function AccessPage() {
  const dict = useDict();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const attemptSetAccessToken = useCallback(async () => {
    if (await cashierApi.verifyAccessToken(token)) {
      enqueueSnackbar("Clé d'accès validé", { variant: "success" });
      await configSet("access_token", token);
      navigate("/");
    } else {
      enqueueSnackbar("Clé d'accès invalide", { variant: "error" });
    }
  }, [token]);

  return (
    <>
      <Typography variant='h5'>{dict.access.title}</Typography>
      <Stack direction='column' gap={1}>
        <TextField
          label={dict.access.token}
          value={token}
          type='password'
          onChange={e => setToken(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              attemptSetAccessToken();
              return true;
            }
          }}
        />

        <Stack direction='row' justifyContent='end'>
          <Button onClick={attemptSetAccessToken}>{dict.access.submit}</Button>
        </Stack>
      </Stack>
    </>
  );
}
