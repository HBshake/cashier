import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import HardwareConfig from "./routes/config/HardwareConfig";
import ConfigLayout from "./layouts/ConfigLayout";
import RootLayout from "./layouts/RootLayout";
import ProfileSelector from "./routes/config/ProfileSelector";
import Login from "./routes/config/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import CashRegister from "./routes/dashboard/CashRegister";
import CustomerPage from "./routes/dashboard/Customer";
import RawMaterialPage from "./routes/dashboard/Matière_Première";
import SessionPage from "./routes/dashboard/Session";


const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' loader={rootRedirect} />,
    <Route element={<RootLayout />}>
      <Route element={<ConfigLayout />}>
        <Route path='/hardware-cfg' element={<HardwareConfig />} />
        <Route path='/login' element={<ProfileSelector />} />
        <Route path="/login/:username/:displayName" element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="cashreg" element={<CashRegister />} />
        <Route path="customer" element={<CustomerPage/>}/>
        <Route path="Matière_Première" element={<RawMaterialPage/>}/>
        <Route path="Session" element={<SessionPage/>}/>
      </Route>
    </Route>,
  ]),
);

async function rootRedirect() {
  return redirect("/hardware-cfg");
}

export default function App() {
  return <RouterProvider router={router} />;
}
