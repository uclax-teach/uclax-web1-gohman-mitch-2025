import styled from "styled-components";
import PropTypes from "prop-types";
import { marked } from "marked";

// styles
const SingleStyled = styled.div`
    padding: 20px;
    margin: 48px 0px;
    background-color: ${(props) => props.theme.colors.secondary.light};

    h3 {
        background-color: ${(props) => props.theme.colors.primary.default};
        margin: -20px -20px 20px;
        padding: 20px;
        color: ${(props) => props.theme.colors.secondary.light};
    }
`;

const Single = ({ number, title, markdown }) => {
    const htmlContent = marked(markdown);
    return (
        <SingleStyled id={`assignmentId-${number}`}>
            <h3>{title}</h3>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </SingleStyled>
    );
};

export default Single;

// prop-types
Single.propTypes = {
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    markdown: PropTypes.string.isRequired,
};
