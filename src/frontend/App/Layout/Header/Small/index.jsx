import styled from "styled-components";

// components
import SmLogo from "./SmLogo";
import SmMenu from "./SmMenu";
import Hamburger from "./Hamburger";

// styles
const SmallStyled = styled.div``;

const Small = () => {
    const toggleMenu = () => {
        console.log({ toggleMenu: true });
    };

    return (
        <SmallStyled>
            <Hamburger onClick={toggleMenu} />
            <SmLogo />
            <SmMenu />
        </SmallStyled>
    );
};

export default Small;
