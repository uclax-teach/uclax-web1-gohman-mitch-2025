import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="sublinks">
            <NavLink to={"/course-work"} end>
                Essays
            </NavLink>
            <NavLink to={"/course-work/sun-and-moon"}>Sun and Moon</NavLink>
            <NavLink to={"/course-work/responsive"}>Responsive</NavLink>
            <NavLink to={"/course-work/javascript-fundamentals"}>
                JS Fundamentals
            </NavLink>
        </nav>
    );
};

export default Nav;
