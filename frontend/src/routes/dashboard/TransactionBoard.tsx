import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "price",
    headerName: "Prix Total TTC",
    width: 300,
    type: "number",
    editable: false,
    sortable: false,
  },
  {
    field: "creation_date",
    headerName: "Crée le",
    width: 300,
    type: "dateTime",
    sortable: false,

  },
  {
    field: "who",
    headerName: "Par",
    type: "string",
    sortable: false,
    width: 300,
  },
  {
    field: "open",
    headerName: "-",
    type: "string",
    width: 100,
    editable: true,
    sortable: false,
  },
];

const rows = [
  { id: 1, price: "89.5", creation_date: "", open:"button", who:"yomama" },
];
export default function TransactionBoard(){
  return (
    <>
      <Typography variant='h4'>Transactions</Typography>
      <Stack direction='column'>
        <Stack direction='row' gap={2}>
          <TextField label='Rechercher par numero de transaction' sx={{ flexGrow: 1 }} />
          <Button>Ouvrir</Button>
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
