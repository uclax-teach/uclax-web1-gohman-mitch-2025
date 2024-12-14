import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

const Link = ({ children, href, className }) => {
    return (
        <RouterLink to={href} className={className}>
            {children}
        </RouterLink>
    );
};

export default Link;

// prop-types
Link.propTypes = {
    children: PropTypes.any,
    href: PropTypes.any.isRequired,
    className: PropTypes.string,
};
