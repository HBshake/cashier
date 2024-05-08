import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "Nom",
    width: 350,
    type: "string",
    editable: true,
    sortable: false,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "string",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "creation_date",
    headerName: "Crée le",
    type: "date",
    sortable: false,
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    name: "Bernoussi",
    creation_date: "",
    stock: "button",
  },
];

export default function ShopPage() {
  return (
    <>
      <Typography variant='h4'>Locaux</Typography>
      <Stack direction='column'>
        <Stack direction='row' gap={2}>
          <TextField label='Rechercher' sx={{ flexGrow: 1 }} />
          <Button>Ajouter un local</Button>
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
