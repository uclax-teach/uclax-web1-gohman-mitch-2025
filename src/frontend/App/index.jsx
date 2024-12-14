import { BrowserRouter, Routes, Route } from "react-router-dom";

// useMediaQuery
import { MediaQueryProvider } from "@Theme/media/MediaQueryContext";

// Layout
import Layout from "./Layout/index";

// Pages :: Primary
import Home from "@Pages/Home";
import Staff from "@Pages/Staff";
import Contact from "@Pages/Contact";

// Pages :: CourseWork
import CourseWork from "@Pages/CourseWork/index";
import Assignments from "@Pages/CourseWork/Subpages/Assignments/index.jsx";
import SunAndMoon from "@Pages/CourseWork/Subpages/SunAndMoon.jsx";
import ResponsiveDesign from "@Pages/CourseWork/Subpages/ResponsiveDesign.jsx";
import Fundamentals from "@Pages/CourseWork/Subpages/Fundamentals";

const App = () => {
    return (
        <MediaQueryProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route index element={<Home />} path="" />
                        <Route element={<Staff />} path="/staff" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<CourseWork />} path="/course-work">
                            <Route element={<Assignments />} path="" />
                            <Route
                                element={<SunAndMoon />}
                                path="sun-and-moon"
                            />
                            <Route
                                element={<ResponsiveDesign />}
                                path="responsive"
                            />
                            <Route
                                element={<Fundamentals />}
                                path="javascript-fundamentals"
                            />
                        </Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </MediaQueryProvider>
    );
};

export default App;
