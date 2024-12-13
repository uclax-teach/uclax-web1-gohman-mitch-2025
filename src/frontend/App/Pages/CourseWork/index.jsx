import { Outlet } from "react-router-dom";

// Layout
import Nav from "./Layout/Nav.jsx";

// Course Work Subpages

const CourseWork = () => {
    return (
        <>
            <h2>CourseWork</h2>
            <Nav />
            <Outlet />
        </>
    );
};

export default CourseWork;
