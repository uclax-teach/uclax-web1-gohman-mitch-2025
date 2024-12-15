import styled from "styled-components";

// data
import { config } from "@Core/config";

const LogoStyled = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const Logo = () => {
    return (
        <LogoStyled
            src="/assets/crossfit-decimate-logo.png"
            alt={`${config.profile.title} Logo`}
            title={`${config.profile.title} Logo`}
        />
    );
};

export default Logo;
