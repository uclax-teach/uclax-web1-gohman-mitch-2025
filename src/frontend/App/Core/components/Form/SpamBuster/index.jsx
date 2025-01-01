import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// component
const SpamBusterProvider = ({ children }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default SpamBusterProvider;

import PropTypes from "prop-types";

// prop-types
SpamBusterProvider.propTypes = {
    children: PropTypes.any,
};
