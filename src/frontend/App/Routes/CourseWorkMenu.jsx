import { NavLink } from "react-router-dom";

// component
const CourseWorkMenu = () => {
    return (
        <nav className="content">
            <NavLink to="/course-work" end>
                Assignments
            </NavLink>
            <NavLink to="/course-work/sun-and-moon">Sun and Moon</NavLink>
            <NavLink to="/course-work/responsive">Responsive</NavLink>
        </nav>
    );
};

export default CourseWorkMenu;
