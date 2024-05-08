import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "../../hooks/req";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import dayjs from "dayjs";

type Product = {
  id: number;
  name: string;
  barcode: number;
  price: number;
  created_at: string;
};

const columns: GridColDef<Product>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Produit",
    type: "string",
    flex: 4,
  },
  {
    field: "barcode",
    headerName: "Barcode",
    type: "number",
    flex: 2,
  },
  {
    field: "price",
    headerName: "Prix",
    type: "number",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Ajouté le",
    valueFormatter: ({ value }) =>
      dayjs(value as string).format("DD/MM/YYYY HH:mm:ss"),
    flex: 2,
  },
];

export default function ProductPage() {
  const [products] = useRequest<Product[]>("/product");
  const [filter, setFilter] = useState("");
  if (!products) {
    return <CircularProgress />;
  }

  const filteredProducts = products.filter(
    r =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.barcode.toString().includes(filter),
  );

  return (
    <>
      <Stack direction='column' gap={2}>
        <Typography variant='h4'>Produits</Typography>
        <Stack direction='row' gap={2}>
          <TextField
            label='Rechercher'
            sx={{ flexGrow: 1 }}
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <Button>
            <AddIcon />
          </Button>
        </Stack>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Stack>
    </>
  );
}
