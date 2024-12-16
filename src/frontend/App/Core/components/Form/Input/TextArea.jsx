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
const TextArea = ({ id, labelText, inputType = "text", onChange, value }) => {
    return (
        <InputGroup htmlFor={id} labelText={labelText}>
            <TextAreaStyled
                id={id}
                name={id}
                value={value}
                type={inputType}
                onChange={onChange}
            />
        </InputGroup>
    );
};

export default TextArea;

// prop-types
TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
