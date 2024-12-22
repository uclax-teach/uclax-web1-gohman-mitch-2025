import { Outlet } from "react-router-dom";

// components
import Meta from "@Core/components/Meta";
import CourseWorkMenu from "@App/Routes/CourseWorkMenu";
import Inset from "@Layout/Inset";

const CourseWork = () => {
    return (
        <main>
            <Inset>
                <Meta pageTitle="Course Work" />
                <h1>Course Work</h1>
                <CourseWorkMenu />
                <Outlet />
            </Inset>
        </main>
    );
};

export default CourseWork;
