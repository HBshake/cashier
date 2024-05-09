import { Button, Stack, TextField } from "@mui/material";
import { cashierApi } from "../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import CheckIcon from "@mui/icons-material/Check";

export default function CustomerAddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ice, setIce] = useState("");
  const [rc, setRc] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const validate = async () => {
    const result = await cashierApi.post<string>("/customer", {
      name,
      ice,
      rc,
      delivery_address: deliveryAddress,
      phone,
      comment,
    });
    if (!result.ok) {
      enqueueSnackbar(`Erreur lors de l'ajout du client: ${result.data}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Client ajouté avec succès", { variant: "success" });
      navigate("/dashboard/customer");
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
        label='ICE'
        value={ice}
        onChange={e => setIce(e.target.value)}
      />
      <TextField label='RC' value={rc} onChange={e => setRc(e.target.value)} />
      <TextField
        label='Addresse de Livraison'
        value={deliveryAddress}
        onChange={e => setDeliveryAddress(e.target.value)}
      />
      <TextField
        label='Téléphone'
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <TextField
        label='Note'
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Stack direction='row'>
        <Button onClick={() => void validate()}>
          <CheckIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
