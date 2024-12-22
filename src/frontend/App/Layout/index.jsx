import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Meta from "@Core/components/Meta";
import Header from "./Header";
import Footer from "./Footer";

// styles
import Theme from "@Theme";
const LayoutStyled = styled.div``;

const Layout = ({ children, pageTitle }) => {
    return (
        <Theme>
            <LayoutStyled>
                <Meta pageTitle={pageTitle} />
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
    pageTitle: PropTypes.string,
};
