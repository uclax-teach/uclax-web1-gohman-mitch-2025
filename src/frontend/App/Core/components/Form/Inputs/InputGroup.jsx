import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const InputGroupStyled = styled.div`
    margin-bottom: 20px;

    label {
        color: white;
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
    }

    .errorMessage {
        padding: 10px;
        color: ${({ theme }) => theme.colors.messaging.error.color};
        background-color: ${({ theme }) =>
            theme.colors.messaging.error.bgColor};
    }
`;

// component
const InputGroup = ({ children, htmlFor, labelText, errorMessage = "" }) => {
    return (
        <InputGroupStyled>
            <label htmlFor={htmlFor}>{labelText}:</label>
            <div className="control">{children}</div>
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </InputGroupStyled>
    );
};

export default InputGroup;

// prop-types
InputGroup.propTypes = {
    children: PropTypes.any,
    htmlFor: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
};
