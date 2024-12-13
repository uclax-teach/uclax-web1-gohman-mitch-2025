import styled from "styled-components";

// components
import MedLgLogo from "./MedLgLogo";
import MedLgMenu from "./MedLgMenu";

const MediumLargeStyled = styled.div``;

const MediumLarge = () => {
    return (
        <MediumLargeStyled>
            <MedLgLogo />
            <MedLgMenu />
        </MediumLargeStyled>
    );
};

export default MediumLarge;
