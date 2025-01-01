import PropTypes from "prop-types";
import styled from "styled-components";

// components
import InputGroup from "./InputGroup";

//styles
import { sharedStyles } from "./styles";
const TextAreaStyled = styled.textarea`
    ${sharedStyles}
    min-height: 300px;
`;

// component
const TextArea = ({ formInput, onChange }) => {
    const { id, labelText, value, errorMessage } = formInput;
    return (
        <InputGroup
            htmlFor={id}
            labelText={labelText}
            errorMessage={errorMessage}
        >
            <TextAreaStyled
                id={id}
                name={id}
                value={value}
                onChange={onChange}
            />
        </InputGroup>
    );
};

export default TextArea;

// prop-types
TextArea.propTypes = {
    formInput: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
