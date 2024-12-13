import styled from "styled-components";
import PropTypes from "prop-types";

const UnstyledButtonStyled = styled.div``;

const UnstyledButton = ({ onClick, children }) => {
    return (
        <UnstyledButtonStyled onClick={onClick}>
            {children}
        </UnstyledButtonStyled>
    );
};

export default UnstyledButton;

// prop-types
UnstyledButton.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
};
