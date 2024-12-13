import styled from "styled-components";

import Nav from "./Nav";

const Header = () => {
    return (
        <HeaderStyled>
            <Nav />
        </HeaderStyled>
    );
};

export default Header;

const HeaderStyled = styled.header``;
