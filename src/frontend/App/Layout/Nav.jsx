import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
    return (
        <NavStyled className="sublinks">
            <NavLink to={"/"} end>
                Home
            </NavLink>
            <NavLink to={"/staff"}>Staff</NavLink>
        </NavStyled>
    );
};

export default Nav;

const NavStyled = styled.nav``;
