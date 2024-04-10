import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import HardwareConfig from "./routes/HardwareConfig";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return redirect("/hardware-cfg");
    },
  },
  {
    path: "/hardware-cfg",
    element: <HardwareConfig />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
