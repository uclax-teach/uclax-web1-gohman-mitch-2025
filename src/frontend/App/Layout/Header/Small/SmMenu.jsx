import styled from "styled-components";
import PropTypes from "prop-types";

// components
import PrimaryMenu from "@Routes/PrimaryMenu";

// styles
const SmMenuStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.primary.default};
    position: fixed;
    z-index: 1000;
    top: 300px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: auto;

    a {
        display: block;
        padding: 0px 20px;
        line-height: 40px;
        background-color: ${({ theme }) => theme.colors.primary.default};
        border-bottom: solid 1px ${({ theme }) => theme.colors.primary.light};

        font-size: 12px;
        color: ${({ theme }) => theme.colors.primary.light};
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;

        &:hover,
        &:active,
        &:focus {
            color: ${({ theme }) => theme.colors.secondary.light};
            background-color: ${({ theme }) => theme.colors.primary.dark};
        }
        &:first-child {
            border-top: solid 1px ${({ theme }) => theme.colors.primary.light};
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
            <PrimaryMenu />
        </SmMenuStyled>
    );
};

export default SmMenu;

// prop-types
SmMenu.propTypes = {
    setShowMenu: PropTypes.func.isRequired,
};
