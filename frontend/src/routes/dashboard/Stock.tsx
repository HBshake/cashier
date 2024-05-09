import {
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "../../hooks/req";
import { Shop } from "../../models/shop";
import { useEffect, useState } from "react";
import { cashierApi } from "../../utils/api";

type InShop = {
  id: number;
  name: string;
  count: number;
};

const columns: GridColDef<InShop>[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Produit",
  },
  {
    field: "count",
    headerName: "Stock",
  },
];

export default function StockPage() {
  const [shops] = useRequest<Shop[]>("/shop");
  const [productStock, setProductStock] = useState<InShop[] | undefined>();
  const [rawMatStock, setRawMatStock] = useState<InShop[] | undefined>();
  const types = [
    {
      name: "Produit",
      value: "product",
    },
    {
      name: "Matière première",
      value: "raw_material",
    },
  ];
  const [selectedType, setSelectedType] = useState(types[0].value);
  const [selectedShop, setSelectedShop] = useState<number | undefined>();

  const [failure, setFailure] = useState(false);

  useEffect(() => {
    if (shops && typeof selectedShop === "undefined" && shops.length > 0) {
      setSelectedShop(shops[0].id);
    }
  }, [shops, selectedShop]);

  useEffect(() => {
    async function load() {
      console.log(selectedShop);
      if (typeof selectedShop === "undefined" || failure) {
        setProductStock(undefined);
        setRawMatStock(undefined);
        return;
      }
      let productResult = await cashierApi.get<InShop[]>(
        `/shop/${selectedShop}/product`,
      );
      let rawMatResult = await cashierApi.get<InShop[]>(
        `/shop/${selectedShop}/raw-material`,
      );

      if (!productResult.ok || !rawMatResult.ok) {
        setFailure(true);
        return;
      }

      setProductStock(productResult.data);
      setRawMatStock(rawMatResult.data);
    }
    void load();
  }, [failure, selectedShop]);

  if (failure) {
    return <Typography variant='h4'>Erreur</Typography>;
  }
  if (!shops || !productStock || !rawMatStock) {
    return <CircularProgress />;
  }

  return (
    <Stack direction='column' gap={2}>
      <Typography variant='h4'>Stock</Typography>
      <Stack direction='row' gap={2}>
        <Select
          label='Shop'
          value={selectedShop}
          onChange={e => setSelectedShop(Number(e.target.value))}
          sx={{ flex: 1 }}
        >
          {shops.map(shop => (
            <MenuItem key={shop.id} value={shop.id}>
              {shop.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          label='Type'
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          sx={{ flex: 1 }}
        >
          {types.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <DataGrid
        rows={selectedType === "product" ? productStock : rawMatStock}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
