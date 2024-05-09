import { CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useRequest } from "../../hooks/req";
import { useState } from "react";

type Transaction = {
  id: number;
  ttype: "Delivery" | "InStore";
  tax_percent: number;
  total_price: number;
  paid?: number;
  created_at: string;
};

const columns: GridColDef<Transaction>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "ttype",
    headerName: "Type",
    valueFormatter: value =>
      value === "Delivery" ? "Livraison" : "En Magasin",
    flex: 2,
  },
  {
    field: "tax_percent",
    headerName: "TVA (%)",
    flex: 1,
    valueFormatter: value => `${value * 100}%`,
  },
  {
    field: "total_price",
    headerName: "Prix Total",
    flex: 1,
    valueFormatter: value => `${value} DH`,
  },
  {
    field: "paid",
    headerName: "Payé",
    flex: 1,
    valueFormatter: value => (value ? `${value} DH` : "-"),
  },
  {
    field: "created_at",
    headerName: "Ajouté le",
    flex: 2,
    valueFormatter: value => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
  },
];

export default function TransactionPage() {
  const [transactions] = useRequest<Transaction[]>("/transaction");
  const [filter, setFilter] = useState("");
  if (!transactions) {
    return <CircularProgress />;
  }

  const filteredTransactions = transactions.filter(t =>
    t.id.toString().includes(filter),
  );

  return (
    <Stack direction='column' gap={2}>
      <Typography variant='h4'>Transactions</Typography>
      <Stack direction='row' gap={2}>
        <TextField
          label='Rechercher par ID'
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Stack>
      <DataGrid
        rows={filteredTransactions}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
