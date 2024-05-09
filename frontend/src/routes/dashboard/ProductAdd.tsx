import { Button, Stack, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { cashierApi } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { FloatTextField } from "../../components/NumberInput";

export default function ProductAddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState(false);

  const validate = async () => {
    const result = await cashierApi.post<string>("/product", {
      name,
      barcode: barcode.length === 0 ? undefined : barcode,
      price,
    });
    if (!result.ok) {
      enqueueSnackbar(`Erreur lors de l'ajout du produit: ${result.data}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Produit ajouté avec succès", { variant: "success" });
      navigate("/dashboard/product");
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label='Nom'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label='Barcode'
        value={barcode}
        onChange={e => setBarcode(e.target.value)}
      />
      <FloatTextField
        value={price}
        setValue={setPrice}
        setError={setPriceError}
        textFieldProps={{
          label: "Prix",
          InputProps: {
            endAdornment: "DH",
          },
        }}
      />
      <Stack direction='row'>
        <Button onClick={() => void validate()} disabled={priceError}>
          <CheckIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
