import { Outlet } from "react-router-dom";
import ThemeRegistry from "../theme/ThemeRegistry";

export default function RootLayout() {
  return (
    <ThemeRegistry>
      <Outlet />
    </ThemeRegistry>
  );
}
