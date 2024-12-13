import styled from "styled-components";

// components
import Logo from "@CoreComponents/Logo";

// styles
const SmLogoStyled = styled.div`
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

const SmLogo = () => {
    return (
        <SmLogoStyled>
            <div>
                <Logo />
            </div>
        </SmLogoStyled>
    );
};

export default SmLogo;
