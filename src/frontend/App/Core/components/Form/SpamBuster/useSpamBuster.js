import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useSpamBuster = (trackingId) => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const getToken = async () => {
        // make sure recpatcha is on before we try sending data
        if (!executeRecaptcha) {
            return {
                success: false,
                message: "Form Submitted too quickly.",
                token: null,
            };
        }

        const token = await executeRecaptcha(trackingId);

        return {
            success: true,
            message: "ReCaptcha Token Retrieved.",
            token,
        };
    };

    return {
        getToken,
    };
};
