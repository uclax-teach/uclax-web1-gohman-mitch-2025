import styled from "styled-components";

// components
import Logo from "@Core/components/Logo";

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
    const {
        VITE_APP_CONFIG_STUDENT_NAME,
        VITE_APP_CONFIG_TITLE,
        VITE_APP_CONFIG_LOCATION,
        VITE_APP_CONFIG_TAGLINE,
    } = import.meta.env;

    return (
        <FooterStyled>
            <div className="logo">
                <Logo />
            </div>
            <h2>
                {VITE_APP_CONFIG_STUDENT_NAME} :: {VITE_APP_CONFIG_TITLE} ::{" "}
                {VITE_APP_CONFIG_TAGLINE} :: {VITE_APP_CONFIG_LOCATION}
            </h2>
            <div className="copyright">
                &copy; {new Date().getFullYear()}. All rights reserved.
            </div>
        </FooterStyled>
    );
};

export default Footer;
