import styled from "styled-components";
import PropTypes from "prop-types";

const MainStyled = styled.main`
    padding: 50px 0px 100px;
`;

const Main = ({ children }) => {
    return <MainStyled>{children}</MainStyled>;
};

export default Main;

// prop-types
Main.propTypes = {
    children: PropTypes.any,
};
