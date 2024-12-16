import PropTypes from "prop-types";
import styled from "styled-components";

// components
import InputGroup from "./InputGroup";

//styles
import { sharedStyles } from "./styles";
const InputStyled = styled.input`
    ${sharedStyles}
`;

// component
const Input = ({ id, labelText, inputType = "text", onChange, value }) => {
    return (
        <InputGroup htmlFor={id} labelText={labelText}>
            <InputStyled
                id={id}
                name={id}
                value={value}
                type={inputType}
                onChange={onChange}
            />
        </InputGroup>
    );
};

export default Input;

// prop-types
Input.propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
