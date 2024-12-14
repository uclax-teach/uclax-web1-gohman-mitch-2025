import styled from "styled-components";

// components
import Logo from "@Core/Logo";

// styles
const FooterStyled = styled.footer`
    padding: 20px 0px;

    text-align: center;

    .logo {
        display: flex;
        justify-content: center;
        img {
            margin-bottom: 10px;
            width: 150px;
        }
    }

    h2 {
        color: ${({ theme }) => theme.colors.secondary.light};
        margin: 5px 0px;
        font-size: 14px;
    }

    .copyright {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.secondary.light};
    }
`;

const Footer = () => {
    return (
        <FooterStyled>
            <div className="logo">
                <Logo />
            </div>
            <h2>
                CrossFit Decimate :: Peace, Love, Unity, Fitness, Chill, and
                Respect :: Colorado Springs, CO
            </h2>
            <div className="copyright">&copy; 2024. All rights reserved.</div>
        </FooterStyled>
    );
};

export default Footer;
