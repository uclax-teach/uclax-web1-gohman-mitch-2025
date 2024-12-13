import { NavLink } from "react-router-dom";

const PrimaryNav = () => {
    return (
        <nav>
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
                    <NavLink to={"/course-work"}>Course</NavLink>
                    <ul>
                        <li>
                            <NavLink to={"/course-work/"}>Essays</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/course-work/sun-and-moon"}>
                                Sun and Moon
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/course-work/responsive"}>
                                Responsive
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/course-work/fundamentals"}>
                                JS Fundamentals
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default PrimaryNav;
