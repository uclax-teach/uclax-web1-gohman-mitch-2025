import styled from "styled-components";

// components
import Logo from "./Logo";
import SiteInfo from "./SiteInfo";
import Copyright from "./Copyright";

// styles
const FooterStyled = styled.footer`
    padding: 20px 0px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary.light};
`;

const Footer = () => {
    return (
        <FooterStyled>
            <Logo />
            <SiteInfo />
            <Copyright />
        </FooterStyled>
    );
};

export default Footer;
