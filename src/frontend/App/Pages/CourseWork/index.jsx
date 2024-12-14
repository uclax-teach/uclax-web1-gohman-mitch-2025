import { Outlet } from "react-router-dom";

// components
import Meta from "@Core/components/Meta";
import Inset from "@Layout/Inset";

const CourseWork = () => {
    return (
        <Inset>
            <Meta pageTitle="Course Work" />
            <h1>Course Work</h1>
            <Outlet />
        </Inset>
    );
};

export default CourseWork;
