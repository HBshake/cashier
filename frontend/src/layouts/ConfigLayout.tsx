import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ConfigLayout() {
  return (
    <Box
      component='main'
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { md: "center" },
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Stack
        sx={{
          p: 4,
          border: { md: 1 },
          borderRadius: 1,
          width: {
            xs: "95%",
            md: "720px",
          },
        }}
        direction='column'
        gap={4}
      >
        <Outlet />
      </Stack>
    </Box>
  );
}
