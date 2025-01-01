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
const Input = ({ formInput, onChange }) => {
    const { id, labelText, type = "text", value, errorMessage } = formInput;
    return (
        <InputGroup
            htmlFor={id}
            labelText={labelText}
            errorMessage={errorMessage}
        >
            <InputStyled
                id={id}
                name={id}
                value={value}
                type={type}
                onChange={onChange}
            />
        </InputGroup>
    );
};

export default Input;

// prop-types
Input.propTypes = {
    formInput: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
