import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIconProps,
  SvgIconTypeMap,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import BarcodeScannerIcon from "../icons/Barcodecanner";
import { LanguageDictionary } from "../hooks/locale";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  AccessTime,
  ConfirmationNumber,
  Home,
  Layers,
  ManageAccounts,
  Person,
  Warehouse,
} from "@mui/icons-material";
import { useDict } from "../hooks/locale";
import { Outlet } from "react-router-dom";

export const DRAWER_WIDTH = 240;
export const TOOLBAR_HEIGHTS = ["48px", "56px", "64px"];
export const CONTENT_PADDING = 3;

type NavDestination = {
  name: keyof LanguageDictionary["dashboard"]["mainNav"];
  icon:
    | ((props: SvgIconProps) => JSX.Element)
    | (OverridableComponent<SvgIconTypeMap<NonNullable<unknown>, "svg">> & {
        muiName: string;
      });
  route: string;
};

const nav: NavDestination[] = [
  {
    name: "cashreg",
    icon: BarcodeScannerIcon,
    route: "cashreg",
  },
  {
    name: "sessions",
    icon: AccessTime,
    route: "Session",
  },
  {
    name: "customers",
    icon: Person,
    route: "customer",
  },
  {
    name: "products",
    icon: CategoryIcon,
    route: "Product",
  },
  {
    name: "locations",
    icon: Home,
    route: "locations",
  },
  {
    name: "stock",
    icon: Warehouse,
    route: "stock",
  },
  {
    name: "rawMats",
    icon: Layers,
    route: "raw-material",
  },
  {
    name: "transactions",
    icon: ConfirmationNumber,
    route: "TransactionBoard",
  },
];

const bottomNav: NavDestination[] = [
  {
    name: "cashiers",
    icon: ManageAccounts,
    route: "cashiers",
  },
];

export default function DashboardLayout() {
  const dict = useDict();

  const cashier = {
    displayName: "Hiba"
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Button
              href="/dashboard"
              variant="text"
              disableRipple
              startIcon={
                <DashboardIcon
                  sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
                />
              }
              sx={{
                justifyContent: "start",
                typography: { textTransform: "none" },
              }}
            >
              <Typography variant="h6" noWrap component="div" color="black">
                {dict.dashboard.title}
              </Typography>
            </Button>
          </Box>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="h6">{cashier.displayName}</Typography>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: TOOLBAR_HEIGHTS,
            height: "auto",
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {nav
//            .filter(({ perms }) => cashierHasPerms(cashier, perms))
            .map(({ name, icon: Icon, route }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton component={Link} href={`/dashboard/${route}`}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={dict.dashboard.mainNav[name]} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
        <List>
          {bottomNav
//            .filter(({ perms }) => cashierHasPerms(cashier, perms))
            .map(({ name, icon: Icon, route }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton component={Link} href={`/dashboard/${route}`}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={dict.dashboard.mainNav[name]} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          ml: `${DRAWER_WIDTH}px`,
          mt: TOOLBAR_HEIGHTS,
          p: CONTENT_PADDING,
          overflow: "scroll2",
          minHeight: TOOLBAR_HEIGHTS.map((h) => `calc(100vh - ${h})`),
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
