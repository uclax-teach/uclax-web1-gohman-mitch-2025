import { Routes, Route, BrowserRouter } from "react-router-dom";

// Providers
import Providers from "./Providers";

// layout
import Layout from "./Layout";

// pages
import Home from "./Pages/Home";
import Staff from "./Pages/Staff";

const Main = () => {
    return (
        <Providers>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Layout />}>
                        <Route index element={<Home />} path="" />
                        <Route element={<Staff />} path="/staff" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Providers>
    );
};

export default Main;
