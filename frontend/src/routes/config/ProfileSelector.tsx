import {
  Avatar,
  CircularProgress,
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
import { useRequest } from "../../hooks/req";

export default function ProfileSelector() {
  const dict = useDict();
  const [cashiers] = useRequest<StrippedAccount[]>("/auth/accounts");

  if(!cashiers) {
    return <CircularProgress />
  }

  if (!cashiers.length) {
    return <Typography paragraph>{dict.login.error.nosetup}</Typography>;
  }

  return (
    <>
      <Typography variant="h4">{dict.login.title}</Typography>
      <List>
        {cashiers.map(({ username, display_name }) => (
          <ListItem key={username} disablePadding>
            <ListItemButton
              component={Link}
              href={`/login/${username}/${display_name}`}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={display_name}
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
