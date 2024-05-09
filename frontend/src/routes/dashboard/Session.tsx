import { CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Session, cashierApi } from "../../utils/api";
import { useRequest } from "../../hooks/req";
import dayjs from "dayjs";

type HistoricalSession = {
  // Sql to typescript
  id: string;
  account_username: string;
  login_time: string;
  logout_time: string | null;
};

const columns: GridColDef<HistoricalSession>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "login_time",
    headerName: "Connexion",
    flex: 2,
    valueFormatter: value => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "logout_time",
    headerName: "Déconnexion",
    flex: 2,
    valueFormatter: value =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm:ss") : "-",
  },
];

export default function SessionPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessions] = useRequest<HistoricalSession[]>("/auth/session");

  useEffect(() => {
    async function load() {
      setSession(await cashierApi.session());
    }
    void load();
  }, []);

  if (!session) {
    return <></>;
  }
  if (!sessions) {
    return <CircularProgress />;
  }
  return (
    <Stack direction='column' gap={2}>
      <Stack direction='row' gap={70}>
        <Typography variant='h4'>Sessions de {session.display_name}</Typography>
      </Stack>
      <DataGrid rows={sessions} columns={columns} disableRowSelectionOnClick />
    </Stack>
  );
}
