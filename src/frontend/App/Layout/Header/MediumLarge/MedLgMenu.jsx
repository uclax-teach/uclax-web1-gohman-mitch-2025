import styled from "styled-components";

// styles
// FIXME: Does Styles Components offer a way to access this object through the Provider?
import { theme } from "@Theme/theme";

// components
import PrimaryNav from "@CoreComponents/PrimaryNav";

// styles
const MedLgMenuStyled = styled.div`
    text-align: center;

    nav {
        > ul {
            > li {
                position: relative;
                width: 100px;
                margin: 0px 5px;
                padding-bottom: 20px;

                > a {
                    display: block;
                    width: 100%;
                    line-height: 30px;
                    color: ${theme.colors.primary.light};
                    border-bottom: solid 3px ${theme.colors.primary.light};

                    text-align: center;
                    font-size: 12px;
                    opacity: 0.8;
                    font-weight: bold;
                    text-decoration: none;
                    text-transform: uppercase;

                    &:hover,
                    &:active,
                    &:focus {
                        opacity: 1;
                    }

                    &.active {
                        color: ${theme.colors.secondary.light};
                        border-bottom-color: ${theme.colors.secondary.light};
                    }
                }

                /* Submenus */
                > ul {
                    display: none;
                    width: 200px;
                    position: absolute;
                    z-index: 100;
                    top: 53px;
                    left: 50%;
                    transform: translateX(-50%);

                    > li {
                        display: block;

                        > a {
                            display: block;
                            width: 100%;
                            line-height: 30px;
                            background-color: ${theme.colors.primary.default};
                            border-bottom: solid 3px
                                ${theme.colors.primary.default};

                            text-align: center;
                            font-size: 12px;
                            color: ${theme.colors.primary.light};
                            font-weight: bold;
                            text-decoration: none;
                            text-transform: uppercase;

                            &:hover,
                            &:active,
                            &:focus {
                                color: ${theme.colors.secondary.light};
                                background-color: ${theme.colors.primary.dark};
                            }
                        }
                    }
                }
                &:hover > ul {
                    display: block;
                }
            }
        }
    }
`;

const MedLgMenu = () => {
    return (
        <MedLgMenuStyled>
            <PrimaryNav />
        </MedLgMenuStyled>
    );
};

export default MedLgMenu;