import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "start",
    headerName: "Début",
    type: "date",
    sortable: false,
    width: 500,
  },
  {
    field: "finish",
    headerName: "Fin",
    type: "date",
    sortable: false,
    width: 500,
  },
  {
    field: "button",
    headerName: "-",
    type: "string",
    sortable: false,
    width: 500,
  },
];

const rows = [{ id: 1, start: "", finish: "", button: "Help" }];

export default function SessionPage() {
  return (
    <>
      <Stack direction='column'>
        <Stack direction='row' gap={70}>
          <Typography variant='h4'>Session de -inserer chkon hna-</Typography>
          <Button>Établir un état de trésorerie</Button>
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
        />
      </Box>
    </>
  );
}
