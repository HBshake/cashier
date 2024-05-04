import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

<Typography variant='h4'>Matières Premières</Typography>;

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "Produit",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "price_per_unit",
    headerName: "Prix de l'unité (dh)",
    type: "string",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "unit",
    headerName: "Unité",
    type: "number",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "creation_date",
    headerName: "Crée le",
    type: "date",
    sortable: false,
    width: 150,
  },
];

const rows = [
  { id: 1, price_per_unit: "7", name: "Sucre", unit: "kg", creation_date: "" },
  { id: 2, price_per_unit: "20", name: "Farine", unit: "kg" },
  { id: 3, price_per_unit: "5", name: "Sel", unit: "kg" },
  { id: 4, price_per_unit: "3", name: "Levure", unit: "sachet" },
];

export default function RawMaterialPage() {
  return (
    <>
      <Typography variant='h4'>Matières Premières</Typography>
      <Stack direction='column'>
        <Stack direction='row' gap={2}>
          <TextField label='Rechercher' sx={{ flexGrow: 1 }} />
          <Button>Ajouter une matière première</Button>
        </Stack>
      </Stack>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
