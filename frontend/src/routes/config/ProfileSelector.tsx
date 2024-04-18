import {
  Avatar,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useDict } from "../../hooks/locale";

export default function ProfileSelector() {
  const dict = useDict();

  const cashiers = [
    {
      username: "ikram",
      displayName: "Ikram",
    },
    {
      username: "hiba",
      displayName: "Hiba",
    },
    {
      username: "youssef",
      displayName: "Youssef",
    }
  ];

  if (!cashiers.length) {
    return <Typography paragraph>{dict.login.error.nosetup}</Typography>;
  }

  return (
    <>
      <Typography variant="h4">{dict.login.title}</Typography>
      <List>
        {cashiers.map(({ username, displayName }) => (
          <ListItem key={username} disablePadding>
            <ListItemButton
              component={Link}
              href={`/login/${username}/${displayName}`}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={displayName}
                secondary={dict.login.loginAs.replaceAll(
                  "{username}",
                  username
                )}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
