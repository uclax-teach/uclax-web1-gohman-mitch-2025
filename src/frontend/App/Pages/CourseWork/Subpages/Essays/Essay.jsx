import styled from "styled-components";
import PropTypes from "prop-types";
import { marked } from "marked";

// styles
const EssayStyled = styled.div``;

const Essay = ({ markdown }) => {
    const htmlContent = marked(markdown);
    return (
        <EssayStyled>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </EssayStyled>
    );
};

export default Essay;

// prop-types
Essay.propTypes = {
    markdown: PropTypes.string.isRequired,
};
