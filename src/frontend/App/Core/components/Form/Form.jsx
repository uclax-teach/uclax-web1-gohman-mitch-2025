import PropTypes from "prop-types";
import styled from "styled-components";

//styles
const FormStyled = styled.form`
    padding: 20px 30px;
    background-color: teal;
`;

const Form = ({ children, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return <FormStyled onSubmit={handleSubmit}>{children}</FormStyled>;
};

export default Form;

// prop-types
Form.propTypes = {
    children: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
};
