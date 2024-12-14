import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

// data/helpers
import { getPageTitle } from "@Core/utils";

const Meta = ({ pageTitle }) => {
    return (
        <Helmet>
            <title>{getPageTitle(pageTitle)}</title>
        </Helmet>
    );
};

export default Meta;

// prop-types
Meta.propTypes = {
    pageTitle: PropTypes.string,
};
