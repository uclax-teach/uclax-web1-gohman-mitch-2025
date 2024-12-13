import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PrimaryNav = () => {
    return (
        <PrimaryNavStyled>
            <NavLink to={"/"} end>
                Home
            </NavLink>
            <NavLink to={"/staff"}>Staff</NavLink>
            <NavLink to={"/course-work"}>Course</NavLink>
        </PrimaryNavStyled>
    );
};

export default PrimaryNav;

const PrimaryNavStyled = styled.nav``;
