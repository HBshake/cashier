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
import RawMaterialPage from "./routes/dashboard/RawMaterial";
import SessionPage from "./routes/dashboard/Session";
import ProductPage from "./routes/dashboard/Product";
import { printerList } from "./utils/hardware";
import { configGet, configUnset } from "./utils/config";
import TransactionBoard from "./routes/dashboard/TransactionBoard";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' loader={rootRedirect} />,
    <Route element={<RootLayout />}>
      <Route element={<ConfigLayout />}>
        <Route path='/hardware-cfg' element={<HardwareConfig />} />
        <Route path='/login' element={<ProfileSelector />} />
        <Route path='/login/:username/:displayName' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='cashreg' element={<CashRegister />} />
        <Route path='customer' element={<CustomerPage />} />
        <Route path='raw-material' element={<RawMaterialPage />} />
        <Route path='Session' element={<SessionPage />} />
        <Route path='Product' element={<ProductPage />} />
        <Route path ='TransactionBoard' element={<TransactionBoard/>}/>
      </Route>
    </Route>,
  ]),
);

async function rootRedirect() {
  const printers = await printerList();
  const mainPrinter = await configGet("printer_main");
  const receiptPrinter = await configGet("printer_receipt");

  const mainPrinterSetup = mainPrinter !== null && printers.includes(mainPrinter);
  const receiptPrinterSetup = receiptPrinter !== null && printers.includes(receiptPrinter);
  const hardwareSetup = mainPrinter && receiptPrinter;

  if(!mainPrinterSetup) {
    configUnset("printer_main");
  }
  if(!receiptPrinterSetup) {
    configUnset("printer_receipt");
  }

  if(!hardwareSetup) {
    return redirect("/hardware-cfg");
  }
  return redirect("/login");
}

export default function App() {
  return <RouterProvider router={router} />;
}
