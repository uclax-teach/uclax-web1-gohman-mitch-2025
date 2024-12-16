import { NavLink } from "react-router-dom";

// components
import CourseWorkSubMenu from "./CourseWorkSubMenu";

const PrimaryMenu = () => {
    return (
        <ul>
            <li>
                <NavLink to={"/"} end>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={"/staff"}>Staff</NavLink>
            </li>
            <li>
                <NavLink to={"/contact"}>Contact</NavLink>
            </li>
            <li>
                <NavLink to={"/course-work"}>Course</NavLink>
                <CourseWorkSubMenu />
            </li>
        </ul>
    );
};

export default PrimaryMenu;
