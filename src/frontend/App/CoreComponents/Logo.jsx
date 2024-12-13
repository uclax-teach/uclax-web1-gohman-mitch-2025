import styled from "styled-components";

const LogoStyled = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const Logo = () => {
    return (
        <LogoStyled
            src="/assets/crossfit-decimate-logo.png"
            alt="CrossFit Decimate Logo"
        />
    );
};

export default Logo;
