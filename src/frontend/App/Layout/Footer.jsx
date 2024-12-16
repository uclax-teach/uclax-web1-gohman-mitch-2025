import styled from "styled-components";

// data
import { config } from "@App/config";

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
    const { studentName, title, location, tagline } = config.profile;

    return (
        <FooterStyled>
            <div className="logo">
                <Logo />
            </div>
            <h2>
                {studentName} :: {title} :: {tagline} :: {location}
            </h2>
            <div className="copyright">
                &copy; {new Date().getFullYear()}. All rights reserved.
            </div>
        </FooterStyled>
    );
};

export default Footer;
