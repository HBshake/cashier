import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "Produit",
    width: 150,
    type: "string",
    editable: true,
    sortable: false,
  },
  {
    field: "code",
    headerName: "Barcode",
    width: 110,
    type: "number",
    editable: true,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Prix",
    type: "number",
    width: 110,
    editable: true,
    sortable: false,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "string",
    width: 100,
    editable: true,
    sortable: false,
  },
  {
    field: "rawmat",
    headerName: "Matières Premières",
    type: "string",
    width: 140,
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
  {
    field: "who",
    headerName: "Par",
    type: "string",
    sortable: false,
    width: 150,
  },
  {
    field: "modified",
    headerName: "Modifié le",
    type: "date",
    sortable: false,
    width: 150,
  },
];

const rows = [
  { id: 1, name: "tartelette", code: "1111", price: "20", creation_date: "", stock:"button", rawmat:"button", who:"yomama" },
];

export default function ProductPage() {
  return (
    <>
      <Typography variant='h4'>Produits</Typography>
      <Stack direction='column'>
        <Stack direction='row' gap={2}>
          <TextField label='Rechercher' sx={{ flexGrow: 1 }} />
          <Button>Ajouter un produit</Button>
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
