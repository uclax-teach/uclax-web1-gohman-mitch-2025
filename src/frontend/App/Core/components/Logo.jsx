import styled from "styled-components";

const LogoStyled = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const Logo = () => {
    const siteTitle = import.meta.env.VITE_APP_CONFIG_TITLE;
    return (
        <LogoStyled
            src="/assets/crossfit-decimate-logo.png"
            alt={`${siteTitle} Logo`}
            title={`${siteTitle} Logo`}
        />
    );
};

export default Logo;
