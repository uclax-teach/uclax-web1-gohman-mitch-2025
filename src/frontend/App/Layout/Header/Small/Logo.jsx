import styled from "styled-components";

// components
import SharedLogo from "@Core/components/Logo";

// styles
const LogoStyled = styled.div`
    display: flex;
    justify-content: center;

    > div {
        height: 300px;
        display: flex;
        align-items: center;
        padding: 20px;
        max-width: 330px;
    }
`;

const Logo = () => {
    return (
        <LogoStyled>
            <div>
                <SharedLogo />
            </div>
        </LogoStyled>
    );
};

export default Logo;
