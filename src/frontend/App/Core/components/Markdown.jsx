import PropTypes from "prop-types";
import { marked } from "marked";

const Markdown = ({ markdown, className }) => {
    const htmlContent = marked(markdown);
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default Markdown;

// prop-types
Markdown.propTypes = {
    className: PropTypes.string,
    markdown: PropTypes.string.isRequired,
};
