import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "../../hooks/req";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";

type RawMaterial = {
  id: number;
  name: string;
  unit_price: number;
  unit_name: string;
  created_at: string;
};

const columns: GridColDef<RawMaterial>[] = [
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
    field: "unit_price",
    headerName: "Prix de l'unité (dh)",
    flex: 1,
  },
  {
    field: "unit_name",
    headerName: "Unité",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Ajouté le",
    valueFormatter: value => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
    flex: 1,
  },
];

export default function RawMaterialPage() {
  const navigate = useNavigate();
  const [rawMaterials] = useRequest<RawMaterial[]>("/raw-material");
  const [filter, setFilter] = useState("");
  if (!rawMaterials) {
    return <CircularProgress />;
  }
  const filteredRawMaterials = rawMaterials.filter(r =>
    r.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Stack direction='column' gap={2}>
      <Typography variant='h4'>Matières Premières</Typography>
      <Stack direction='row' gap={2}>
        <TextField
          label='Rechercher par Nom'
          sx={{ flexGrow: 1 }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <Button onClick={() => navigate("add")}>
          <AddIcon />
        </Button>
      </Stack>
      <DataGrid
        rows={filteredRawMaterials}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
