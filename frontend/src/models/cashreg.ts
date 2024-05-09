import { useMemo } from "react";
import { useDict } from "../hooks/locale";
import { GridColDef } from "@mui/x-data-grid";

export function useTransactionItemsDataGrid(): GridColDef[] {
  const dict = useDict();
  return useMemo(
    () => [
      {
        field: "id",
        headerName: dict.common.dataModel.id,
        flex: 1,
      },
      {
        field: "name",
        headerName: dict.common.dataModel.name,
        flex: 4,
      },
      {
        field: "unit_price",
        headerName: dict.transactions.item.price,
        type: "number",
        flex: 2,
      },
      {
        field: "count",
        headerName: dict.transactions.item.quantity,
        type: "number",
        flex: 1,
      },
      {
        field: "total_price",
        headerName: dict.transactions.item.totalPrice,
        type: "number",
        flex: 2,
      },
    ],
    [
      dict.common.dataModel.id,
      dict.common.dataModel.name,
      dict.transactions.item.price,
      dict.transactions.item.quantity,
      dict.transactions.item.totalPrice,
    ]
  );
}