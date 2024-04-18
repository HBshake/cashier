import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDict } from "../../hooks/locale";
import { useCallback, useState } from "react";

export default function Login() {
  const { username, displayName } = useParams();
  const navigate = useNavigate();
  const dict = useDict();

  const [password, setPassword] = useState("");


  const attemptLogin = useCallback(() => {
    navigate("/dashboard/cashreg");
  }, []);

  return (
    <>
      <Typography variant='h4'>
        {dict.login.loginAs.replaceAll("{username}", displayName ?? username ?? "<unknown>")}
      </Typography>
      <Stack direction='column' gap={1}>
        <TextField
          label={dict.login.password}
          value={password}
          type='password'
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              attemptLogin();
              return true;
            }
          }}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Button href='/login'>{dict.common.nav.back}</Button>
          <Button onClick={attemptLogin}>{dict.login.submit}</Button>
        </Stack>
      </Stack>
    </>
  );
}
