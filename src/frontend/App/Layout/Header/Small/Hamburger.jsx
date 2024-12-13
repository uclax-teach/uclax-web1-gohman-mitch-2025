import styled from "styled-components";
import PropTypes from "prop-types";

// font-awesome SVG Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

// components
import UnstyledButton from "@CoreComponents/Button/UnstyledButton";

// styles
const HamburgerStyled = styled(UnstyledButton)`
    position: absolute;
    top: 20px;
    right: 20px;

    font-size: 30px;
    color: white;

    cursor: pointer;
`;

const Hamburger = ({ onClick }) => {
    return (
        <HamburgerStyled onClick={onClick}>
            <FontAwesomeIcon icon={faHamburger} />
        </HamburgerStyled>
    );
};

export default Hamburger;

// prop-types
Hamburger.propTypes = {
    onClick: PropTypes.func.isRequired,
};
