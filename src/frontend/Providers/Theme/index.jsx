import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import "normalize.css"; // Import normalize.css globally

import { theme } from "./theme";
import GlobalStyle from "./GlobalStyle";

const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default Theme;

// prop-types
Theme.propTypes = {
    children: PropTypes.any,
};
