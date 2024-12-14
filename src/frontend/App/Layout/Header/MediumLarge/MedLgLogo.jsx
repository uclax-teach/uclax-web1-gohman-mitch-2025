import styled from "styled-components";

// components
import Logo from "@Core/components/Logo";

// styles
const MedLgLogoStyled = styled.div`
    width: 25%;
    margin: auto;
    padding: 20px 0px;
`;

const MedLgLogo = () => {
    return (
        <MedLgLogoStyled>
            <Logo />
        </MedLgLogoStyled>
    );
};

export default MedLgLogo;
