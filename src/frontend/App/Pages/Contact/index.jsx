import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { config } from "@App/config";

// components
import Meta from "@Core/components/Meta";
import Inset from "@Layout/Inset";
import Form from "./Form";

const Contact = () => {
    return (
        <Inset>
            <Meta pageTitle="Contact" />
            <h1>Contact</h1>
            <GoogleReCaptchaProvider reCaptchaKey={config.app.recaptchaSiteKey}>
                <Form />
            </GoogleReCaptchaProvider>
        </Inset>
    );
};

export default Contact;
