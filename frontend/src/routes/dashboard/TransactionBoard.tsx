import {
  CONTENT_PADDING,
  TOOLBAR_HEIGHTS,
} from "../../layouts/DashboardLayout";
import { Add, Check } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useDict } from "../../hooks/locale";
import { useTransactionItemsDataGrid } from "../../models/cashreg";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FloatTextField, IntTextField } from "../../components/NumberInput";
import { useRequest } from "../../hooks/req";
import { Product } from "../../models/product";
import { cashierApi } from "../../utils/api";
import { enqueueSnackbar } from "notistack";

type ProductInTransaction = {
  id: number;
  name: string;
  unit_price: number;
  count: number;
  total_price: number;
};

export default function TransactionBoard() {
  const [products] = useRequest<Product[]>("/product");
  const [customers] = useRequest<Customer[]>("/customer");

  const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [reduction, setReduction] = useState(0);
  const [reductionType, setReductionType] = useState("PERCENT");
  const [totalPriceExclTax, setTotalPriceExclTax] = useState(0);
  const [tax, setTax] = useState(20);
  const [totalPriceInclTax, setTotalPriceInclTax] = useState(0);
  const [paid, setPaid] = useState(0);
  const [returned, setReturned] = useState(0);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [reductionError, setReductionError] = useState(false);
  const [taxError, setTaxError] = useState(false);

  const [productsInTransaction, setProductsInTransaction] = useState<
    ProductInTransaction[]
  >([]);

  const transactionItemsColumns = useTransactionItemsDataGrid();

  const validateTransaction = async () => {
    if (reductionError) {
      enqueueSnackbar("Valeur de remise invalide", { variant: "error" });
      return;
    }
    if (taxError) {
      enqueueSnackbar("Valeur de taxe invalide", { variant: "error" });
      return;
    }
    if (productsInTransaction.length === 0) {
      enqueueSnackbar("Aucun produit dans la transaction", {
        variant: "error",
      });
      return;
    }
    const result = await cashierApi.post("/transaction", {
      ttype: "InStore",
      tax_percent: tax / 100,
      total_price: totalPriceInclTax,
      paid: paid,
      products: productsInTransaction,
    });

    if (!result.ok) {
      enqueueSnackbar("Erreur lors de la validation de la transaction", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Transaction validée", { variant: "success" });
    }

    // Reset state
    setReduction(0);
    setReductionType("PERCENT");
    setTotalPriceExclTax(0);
    setTax(20);
    setTotalPriceInclTax(0);
    setPaid(0);
    setReturned(0);
    setCustomer(null);
    setProductsInTransaction([]);
    setSelectedAmount(1);
    setSelectedProduct(null);
  };

  // Update dependencies
  useEffect(() => {
    const total = productsInTransaction.reduce(
      (acc, item) => acc + item.total_price,
      0,
    );
    setTotalPriceExclTax(
      total -
        (reductionType === "PERCENT" ? (total * reduction) / 100 : reduction),
    );
  }, [productsInTransaction, reduction]);
  useEffect(() => {
    setTotalPriceInclTax(totalPriceExclTax * (1 + tax / 100));
  }, [totalPriceExclTax, tax]);
  useEffect(() => {
    setReturned(paid - totalPriceInclTax);
  }, [paid, totalPriceInclTax]);

  const dict = useDict();
  if (!products || !customers) {
    return <CircularProgress />;
  }
  return (
    <Stack direction='column' gap={3}>
      <Paper
        sx={{
          position: "sticky",
          zIndex: 3,
          top: TOOLBAR_HEIGHTS,
          mx: -CONTENT_PADDING,
          p: CONTENT_PADDING,
          borderRadius: 0,
        }}
      >
        <Stack direction='column' gap={3}>
          <Stack direction='row' gap={6}>
            <Stack direction='row' gap={2} mr='auto' sx={{ flex: 1 }}>
              <FloatTextField
                value={reduction}
                setValue={setReduction}
                setError={setReductionError}
                textFieldProps={{
                  label: dict.cashreg.reduction,
                }}
              />
              <TextField
                select
                variant='outlined'
                value={reductionType}
                label={dict.cashreg.reductionType}
                onChange={e => setReductionType(e.target.value)}
                sx={{ minWidth: "5%" }}
              >
                <MenuItem value={"PERCENT"}>{dict.common.percent}</MenuItem>
                <MenuItem value={"ABSOLUTE"}>{dict.common.currency}</MenuItem>
              </TextField>
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <TextField
              value={totalPriceExclTax}
              label={dict.cashreg.totalPriceExclTax}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {dict.common.currency}
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction='row' gap={2} alignItems='center'>
              <FloatTextField
                value={tax}
                setValue={setTax}
                setError={setTaxError}
                textFieldProps={{
                  label: dict.cashreg.taxPercent,
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        {dict.common.percent}
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                value={totalPriceInclTax}
                label={dict.cashreg.totalPriceInclTax}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {dict.common.currency}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <FloatTextField
              value={paid}
              setValue={setPaid}
              textFieldProps={{
                label: dict.cashreg.payed,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      {dict.common.currency}
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              value={returned}
              label={dict.cashreg.returned}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {dict.common.currency}
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Autocomplete
              options={customers}
              onChange={(_, value) => setCustomer(value)}
              renderInput={params => (
                <TextField {...params} label={dict.cashreg.customer} />
              )}
              getOptionLabel={option => option.name}
              sx={{ minWidth: "15%" }}
            />
            <Button endIcon={<Check />} onClick={validateTransaction}>
              {dict.cashreg.validate}
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Box />
      <Divider />
      <Stack direction='column' gap={2} sx={{ flexGrow: 1, flexShrink: 0 }}>
        <Stack direction='row' gap={2}>
          <Autocomplete
            options={products}
            onChange={(_, value) => setSelectedProduct(value)}
            renderInput={params => (
              <TextField {...params} label={dict.cashreg.product} />
            )}
            getOptionLabel={option => option.name}
            sx={{ flexGrow: 1 }}
          />

          <Stack direction='row' gap={2}>
            <IntTextField
              value={selectedAmount}
              setValue={setSelectedAmount}
              textFieldProps={{ label: "Quantité" }}
            />
            <Button
              startIcon={<Add />}
              sx={{ flexGrow: 1 }}
              onClick={() => {
                if (selectedProduct && selectedAmount > 0) {
                  setProductsInTransaction([
                    ...productsInTransaction,
                    {
                      id: selectedProduct.id,
                      name: selectedProduct.name,
                      unit_price: selectedProduct.price,
                      count: selectedAmount,
                      total_price: selectedProduct.price * selectedAmount,
                    },
                  ]);
                  setSelectedAmount(1);
                  setSelectedProduct(null);
                }
              }}
            >
              {dict.cashreg.add}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <DataGrid
        columns={transactionItemsColumns}
        rows={productsInTransaction}
        disableRowSelectionOnClick
        checkboxSelection
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        hideFooterSelectedRowCount
        pageSizeOptions={[15]}
      />
    </Stack>
  );
}
