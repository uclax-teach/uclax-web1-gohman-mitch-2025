import styled from "styled-components";
import PropTypes from "prop-types";

// styles
// FIXME: Does Styles Components offer a way to access this object through the Provider?
import { theme } from "@Theme/theme";

// components
import PrimaryNav from "@CoreComponents/PrimaryNav";

// styles
const SmMenuStyled = styled.div`
    background-color: ${theme.colors.primary.default};
    position: fixed;
    top: 300px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding-top: 100px;
    overflow-y: auto;

    nav {
        > ul {
            > li {
                display: block;
                a {
                    display: block;
                    padding: 0px 20px;
                    line-height: 40px;
                    background-color: ${theme.colors.primary.default};
                    border-bottom: solid 1px ${theme.colors.primary.light};

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

                &:first-child {
                    a {
                        border-top: solid 1px ${theme.colors.primary.light};
                    }
                }
                > ul {
                    > li {
                        display: block;

                        > a {
                            padding: 0px 20px 0px 40px;
                        }
                    }
                }
            }
        }
    }
`;

const SmMenu = ({ setShowMenu }) => {
    return (
        <SmMenuStyled
            onClick={() => {
                setShowMenu(false);
            }}
        >
            <PrimaryNav />
        </SmMenuStyled>
    );
};

export default SmMenu;

// prop-types
SmMenu.propTypes = {
    setShowMenu: PropTypes.func.isRequired,
};
