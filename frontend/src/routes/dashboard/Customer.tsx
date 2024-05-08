import * as React from "react";
import {
  Button,
  Stack,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  CircularProgress,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { creationTime } from "../../utils/format";
import { useRequest } from "../../hooks/req";

export default function CustomerPage() {
  const [customers,] = useRequest<Customer[]>("/customer");

  if(!customers) {
    return <CircularProgress />
  }

  return (
    <Stack direction='column'>
      <Stack direction='row' gap={2}>
        <TextField label='Rechercher' sx={{ flexGrow: 1 }} />
        <Button>Ajouter un client</Button>
      </Stack>

      <List
        sx={{ width: "100", maxWidth: "360", bgcolor: "background.paper" }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        {customers.map(customer => (
          <CustomerRow key={customer.id} customer={customer} />
        ))}
      </List>
    </Stack>
  );
}

function CustomerRow({ customer }: { customer: Customer }) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <ListItem>
      <Stack direction='column' sx={{width: "100%"}}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={customer.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Stack>
            <ListItemText primary={`Nom: ${customer.name}`} />
            {customer.ice ? (
              <ListItemText primary={`ICE: ${customer.comment}`} />
            ) : (
              <></>
            )}
            {customer.rc ? (
              <ListItemText primary={`RC: ${customer.comment}`} />
            ) : (
              <></>
            )}
            {customer.delivery_address ? (
              <ListItemText
                primary={`Addresse de Livraison: ${customer.comment}`}
              />
            ) : (
              <></>
            )}
            {customer.phone ? (
              <ListItemText primary={`Téléphone: ${customer.comment}`} />
            ) : (
              <></>
            )}
            {customer.comment ? (
              <ListItemText primary={`Note: ${customer.comment}`} />
            ) : (
              <></>
            )}
            <ListItemText
              primary={`Ajouter le: ${creationTime(customer.created_at)}`}
            />
          </Stack>
        </Collapse>
      </Stack>
    </ListItem>
  );
}
