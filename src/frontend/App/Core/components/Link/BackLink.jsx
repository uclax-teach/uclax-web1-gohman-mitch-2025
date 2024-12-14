import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackLinkStyled = styled(Link)`
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.primary.default};
    color: ${({ theme }) => theme.colors.secondary.light};
    padding: 5px 15px;
    margin: 24px 0px;
    text-decoration: none;
    border-radius: 0px 5px 5px 0px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.dark};
    }
`;

const BackLink = ({ children, href, className }) => {
    return (
        <BackLinkStyled href={href} className={className}>
            <FontAwesomeIcon icon={faArrowLeft} /> {children}
        </BackLinkStyled>
    );
};

export default BackLink;

// prop-types
BackLink.propTypes = {
    children: PropTypes.any,
    href: PropTypes.any.isRequired,
    className: PropTypes.string,
};
