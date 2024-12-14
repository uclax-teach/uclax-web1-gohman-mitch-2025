import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BreadcrumbsStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.primary.default};
    display: inline-block;
    padding: 5px 15px;
    margin: 0px 0px 20px;
    border-radius: 0px 10px 10px 0px;

    font-size: 14px;

    .link-container {
        display: inline-block;

        a {
            display: inline-block;
            color: ${({ theme }) => theme.colors.primary.light};
            text-decoration: none;

            &:hover {
                color: ${({ theme }) => theme.colors.secondary.light};
                text-decoration: underline;
            }
        }
        .icon {
            display: inline-block;
            margin: 0px 10px;
            color: ${({ theme }) => theme.colors.primary.light};
        }
    }

    .no-link {
        display: inline-block;
        color: ${({ theme }) => theme.colors.secondary.light};
    }
`;

const Breadcrumbs = ({ crumbs }) => {
    return (
        <BreadcrumbsStyled>
            {crumbs.map(({ id, href, text }) => {
                return href ? (
                    <div key={id} className="link-container">
                        <Link to={href}>{text}</Link>
                        <div className="icon">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                ) : (
                    <div key={id} className="no-link">
                        {text}
                    </div>
                );
            })}
        </BreadcrumbsStyled>
    );
};

export default Breadcrumbs;

// prop-types
Breadcrumbs.propTypes = {
    crumbs: PropTypes.any,
};
