import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// components
import Meta from "@Core/components/Meta";
import Inset from "@Layout/Inset";
import Form from "./Form";

const Contact = () => {
    return (
        <main>
            <Inset>
                <Meta pageTitle="Contact" />
                <h1>Contact</h1>
                <GoogleReCaptchaProvider
                    reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                >
                    <Form />
                </GoogleReCaptchaProvider>
            </Inset>
        </main>
    );
};

export default Contact;
