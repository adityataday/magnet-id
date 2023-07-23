import { useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";

const App = () => {
  useEffect(() => {
    alert(
      "Smart Contract Account Created: 0x93720489a9525a51e3d3529107fabdca752ac158"
    );
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["drawing"],
  });

  return <div>{!isLoaded ? <h1>Loading...</h1> : <Dashboard />}</div>;
};

export default App;
