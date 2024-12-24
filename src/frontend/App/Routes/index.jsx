import { Routes, Route } from "react-router-dom";

// Pages :: Primary
import Home from "@Pages/Home/index";
import Staff from "@Pages/Staff";
import StaffMember from "@Pages/Staff/StaffMember";
import Contact from "@Pages/Contact";

// Pages :: CourseWork
import CourseWork from "@Pages/CourseWork/index";
import Assignments from "@Pages/CourseWork/Assignments/index.jsx";
import SunAndMoon from "@Pages/CourseWork/SunAndMoon.jsx";
import ResponsiveDesign from "@Pages/CourseWork/ResponsiveDesign.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} path="" />
            <Route path="/staff">
                <Route index element={<Staff />} path="" />
                <Route element={<StaffMember />} path=":staffId" />
            </Route>
            <Route element={<Contact />} path="/contact" />
            <Route element={<CourseWork />} path="/course-work">
                <Route element={<Assignments />} path="" />
                <Route element={<SunAndMoon />} path="sun-and-moon" />
                <Route element={<ResponsiveDesign />} path="responsive" />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
