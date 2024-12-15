import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Markdown from "@Core/components/Markdown";

// styles
const AssignmentTemplateStyled = styled(Markdown)`
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

const AssignmentTemplate = ({ markdown }) => {
    return <AssignmentTemplateStyled markdown={markdown} />;
};

export default AssignmentTemplate;

// prop-types
AssignmentTemplate.propTypes = {
    markdown: PropTypes.string.isRequired,
};
