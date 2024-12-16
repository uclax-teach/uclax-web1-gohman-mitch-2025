import { Outlet } from "react-router-dom";

// components
import Meta from "@Core/components/Meta";
import CourseWorkSubMenu from "@Core/components/Menus/CourseWorkSubMenu";
import Inset from "@Layout/Inset";

const CourseWork = () => {
    return (
        <Inset>
            <Meta pageTitle="Course Work" />
            <h1>Course Work</h1>
            <nav className="content">
                <CourseWorkSubMenu />
            </nav>
            <Outlet />
        </Inset>
    );
};

export default CourseWork;
