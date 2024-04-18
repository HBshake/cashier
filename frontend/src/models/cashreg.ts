import { useMemo } from "react";
import { useDict } from "../hooks/locale";
import { GridColDef } from "@mui/x-data-grid";

export function useTransactionItemsDataGrid(): GridColDef[] {
  const dict = useDict();
  return useMemo(
    () => [
      {
        field: "prodId",
        headerName: dict.common.dataModel.id,
        sortable: false,
      },
      {
        field: "prodName",
        headerName: dict.common.dataModel.name,
        flex: 1,
        sortable: false,
      },
      {
        field: "prodPrice",
        headerName: dict.transactions.item.price,
        type: "number",
        flex: 1,
        editable: true,
        sortable: false,
      },
      {
        field: "quantity",
        headerName: dict.transactions.item.quantity,
        type: "number",
        flex: 1,
        editable: true,
        sortable: false,
      },
      {
        field: "totalPrice",
        headerName: dict.transactions.item.totalPrice,
        type: "number",
        flex: 1,
        editable: true,
        sortable: false,
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