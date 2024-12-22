import { NavLink } from "react-router-dom";

const PrimaryMenu = () => {
    return (
        <nav>
            <NavLink to={"/"} end>
                Home
            </NavLink>
            <NavLink to={"/staff"}>Staff</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
            <NavLink to={"/course-work"}>Course</NavLink>
        </nav>
    );
};

export default PrimaryMenu;
