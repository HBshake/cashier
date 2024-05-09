import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "../../hooks/req";
import dayjs from "dayjs";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type Shop = {
  id: number;
  name: string;
  stock: string;
  creation_date: string;
};

const columns: GridColDef<Shop>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Nom",
    flex: 4,
  },
  {
    field: "created_at",
    headerName: "Crée le",
    flex: 2,
    valueFormatter: value => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
  },
];

export default function StockPage() {
  const [shops] = useRequest<Shop[]>("/shop");
  const [filter, setFilter] = useState("");
  if (!shops) {
    return <CircularProgress />;
  }

  const filteredShops = shops.filter(shop => shop.name.includes(filter));

  return (
    <Stack direction='column' gap={2}>
      <Typography variant='h4'>Locaux</Typography>
      <Stack direction='row' gap={2}>
        <TextField
          label='Rechercher par Nom'
          sx={{ flexGrow: 1 }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <Button>
          <AddIcon />
        </Button>
      </Stack>
      <DataGrid
        rows={filteredShops}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
