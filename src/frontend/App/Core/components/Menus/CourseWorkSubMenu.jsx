import { NavLink } from "react-router-dom";

const CourseWorkSubMenu = () => {
    return (
        <ul>
            <li>
                <NavLink to={"/course-work/"}>Assignments</NavLink>
            </li>
            <li>
                <NavLink to={"/course-work/sun-and-moon"}>Sun and Moon</NavLink>
            </li>
            <li>
                <NavLink to={"/course-work/responsive"}>Responsive</NavLink>
            </li>
        </ul>
    );
};

export default CourseWorkSubMenu;
