import { createTheme } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";

export const cashierThemeFr = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF9B00",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiList: {
      defaultProps: {
        sx: {
          mx: 1,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiFab: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          margin: 0,
          top: "auto",
          right: 25,
          bottom: 25,
          left: "auto",
          position: "fixed",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        FormHelperTextProps: {
          sx: {
            position: "absolute",
            bottom: "-1.3rem",
          },
        },
      },
    },
  },
}, frFR);

