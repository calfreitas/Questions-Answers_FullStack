import AppRoutes from "./routes";
import createInstanceAxios from './Components/axios';
import { useEffect } from "react";

const axiosInstance = createInstanceAxios();

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  
  return (
    <div>
      < AppRoutes />
    </div>
  );
}

export default App;