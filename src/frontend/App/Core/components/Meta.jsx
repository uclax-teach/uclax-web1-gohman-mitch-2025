import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Meta = ({ pageTitle }) => {
    const {
        VITE_APP_CONFIG_STUDENT_NAME,
        VITE_APP_CONFIG_TITLE,
        VITE_APP_CONFIG_LOCATION,
    } = import.meta.env;
    const defaultTitle = `${VITE_APP_CONFIG_STUDENT_NAME} :: ${VITE_APP_CONFIG_TITLE} :: ${VITE_APP_CONFIG_LOCATION}`;
    const finalTitle = pageTitle
        ? `${pageTitle} :: ${defaultTitle}`
        : defaultTitle;

    return (
        <Helmet>
            <title>{finalTitle}</title>
        </Helmet>
    );
};

export default Meta;

// prop-types
Meta.propTypes = {
    pageTitle: PropTypes.string,
};
