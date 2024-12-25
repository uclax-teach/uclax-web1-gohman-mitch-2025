import styled from "styled-components";

// components
import SharedLogo from "@App/Core/components/Logo";

//styles
const LogoStyled = styled.div`
    width: 25%;
    margin: auto;
    padding: 20px 0px;
`;

// component
const Logo = () => {
    return (
        <LogoStyled>
            <SharedLogo />
        </LogoStyled>
    );
};

export default Logo;
