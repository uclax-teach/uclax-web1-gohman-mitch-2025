import styled from "styled-components";

// components
import SharedLogo from "@App/Core/components/Logo";

//styles
const LogoStyled = styled.div`
    display: flex;
    justify-content: center;
    img {
        margin-bottom: 20px;
        width: 150px;
    }
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
