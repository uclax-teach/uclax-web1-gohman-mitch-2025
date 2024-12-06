import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
    return (
        <LayoutStyled>
            <nav className="sublinks">
                <NavLink to={"/"} end>
                    Home
                </NavLink>
                <NavLink to={"/staff"}>Staff</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </LayoutStyled>
    );
};

export default Layout;

const LayoutStyled = styled.div``;
