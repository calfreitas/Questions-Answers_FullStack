import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Questions from "./Pages/Questions";
import Login from "./Pages/Login";
import Header from "./Components/header";

function AppContent() {
    const location = useLocation();
    const hideHeader = location.pathname === "/";

    return (
        <>
            {!hideHeader && <Header />}

            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Questions" element={<Questions />} ></Route>
                {/* <Route path="/"></Route> */}
            </Routes>
        </>
    );
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default AppRoutes;