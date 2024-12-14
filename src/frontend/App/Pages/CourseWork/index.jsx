import { Outlet } from "react-router-dom";

// components
import Inset from "@Layout/Inset";

const CourseWork = () => {
    return (
        <Inset>
            <h1>Course Work</h1>
            <Outlet />
        </Inset>
    );
};

export default CourseWork;
