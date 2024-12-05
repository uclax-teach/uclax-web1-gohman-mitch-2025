"use client";

import PropTypes from "prop-types";

// providers
import Theme from "./Theme";

const Providers = ({ children }) => {
    return <Theme>{children}</Theme>;
};

export default Providers;

// prop-types
Providers.propTypes = {
    children: PropTypes.any,
};
