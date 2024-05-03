import * as React from "react";
import {
  Button,
  Stack,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

export default function CustomerPage() {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
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
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Chaimae' />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Yahya' />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Hiba' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Stack spacing={2}>
                <ListItemText primary='Nom :' />
                <ListItemText primary='ICE' />
                <ListItemText primary='RC' />
                <ListItemText primary='Adresse de livraison' />
                <ListItemText primary='Téléphone' />
                <ListItemText primary='Commentaire' />
                <ListItemText primary='Crée le  :' />
              </Stack>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Stack>
  );
}
