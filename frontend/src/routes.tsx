import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Dashboard  from "./Pages/Dashboard";
import Login from "./Pages/Login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> }></Route>
                <Route path="/Dashboard" element={ <Dashboard /> } ></Route>
                {/* <Route path="/"></Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;