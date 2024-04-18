import {
  CONTENT_PADDING,
  TOOLBAR_HEIGHTS,
} from "../../layouts/DashboardLayout";
import { Add, Check } from "@mui/icons-material";
import {
  Box,
  Button,
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

export default function TransactionBoard() {
  const transactionItemsColumns = useTransactionItemsDataGrid();
  const transactionItems = [
    {
      id: 1,
      prodId: 1,
      prodName: "Rond Sucré",
      prodPrice: 12.0,
      quantity: 8,
      totalPrice: 12*8,
    },
    {
      id: 2,
      prodId: 2,
      prodName: "Carré Salé",
      prodPrice: 10.0,
      quantity: 15,
      totalPrice: 10*15,
    }
  ];
  const dict = useDict();
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
              <TextField
                value='5'
                label={dict.cashreg.reduction}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {dict.common.percent}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                variant='outlined'
                value="PERCENTAGE"
                label={dict.cashreg.reductionType}
                sx={{ minWidth: "5%" }}
              >
                <MenuItem value={"PERCENTAGE"}>{dict.common.percent}</MenuItem>
                <MenuItem value={"ABSOLUTE"}>{dict.common.currency}</MenuItem>
              </TextField>
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <TextField
              value='233.70'
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
              <TextField
                value='20'
                label={dict.cashreg.taxPercent}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {dict.common.percent}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                value='280.44'
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
            <TextField
              value='300.00'
              label={dict.cashreg.payed}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {dict.common.currency}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value='19.56'
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
          <Stack direction='row'>
            <TextField value='-' label={dict.cashreg.customer} />
            <Box sx={{ flex: 2 }} />
            <Button endIcon={<Check />}>{dict.cashreg.validate}</Button>
          </Stack>
        </Stack>
      </Paper>
      <Box />
      <Divider />
      <Stack direction='column' gap={2} sx={{ flexGrow: 1, flexShrink: 0 }}>
        <Stack direction='row' gap={2}>
          <TextField
            value='Carré Salé en Beurre'
            label={dict.cashreg.product}
            sx={{ flexGrow: 1, flexShrink: 0 }}
          />
          <Stack direction='row' gap={2}>
            <TextField
              value='2'
              label={dict.cashreg.quantity}
            />
            <Button startIcon={<Add />} sx={{ flexGrow: 1 }}>
              {dict.cashreg.add}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <DataGrid
        columns={transactionItemsColumns}
        rows={transactionItems}
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
