import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const ButtonStyled = styled.button`
    background-color: ${({ theme }) => theme.colors.secondary.default};
    padding: 10px 5px;
    color: ${({ theme }) => theme.colors.primary.default};
    width: 150px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 18px;

    cursor: pointer;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colors.primary.default};
        color: ${({ theme }) => theme.colors.secondary.light};
    }
    &:active {
        background-color: ${({ theme }) => theme.colors.primary.dark};
        color: ${({ theme }) => theme.colors.secondary.light};
    }
`;

// component
const Button = ({ children, type = "text" }) => {
    return <ButtonStyled type={type}>{children}</ButtonStyled>;
};

export default Button;

// prop-types
Button.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
};
