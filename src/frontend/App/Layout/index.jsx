import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Header from "./Header";
import Footer from "./Footer";

// styles
import Theme from "@Theme";
const LayoutStyled = styled.div``;

const Layout = ({ children }) => {
    return (
        <Theme>
            <LayoutStyled>
                <Header />
                {children}
                <Footer />
            </LayoutStyled>
        </Theme>
    );
};

export default Layout;

// prop-types
Layout.propTypes = {
    children: PropTypes.any,
};
