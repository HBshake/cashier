import { Box, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "name",
    headerName: "Produit",
    width: 500,
    type: "string",
    editable: true,
    sortable: true,
  },
  {
    field: "num",
    headerName: "Stock",
    width: 500,
    type: "number",
    editable: true,
    sortable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "tartelette",
    num: "50",
  },
];

export default function StockPage() {
  return (
    <>
      <Typography variant='h4'>Stock</Typography>
      <Stack direction='column'>
        <Stack direction='row' gap={2}>
          <TextField label='Rechercher un Local' sx={{ flexGrow: 1 }} />
          
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
