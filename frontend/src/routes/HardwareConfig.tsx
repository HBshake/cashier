import { Link } from "react-router-dom";
import { useNative } from "../hooks/native";

export default function HardwareConfig() {
  const printers = useNative<string[]>("printer_list");

  return (
    <>
      <h1>Hardware Config</h1>
      {printers?.map(printer => <h2>{printer}</h2>)}
      <Link to='/login'>Next</Link>
    </>
  );
}
