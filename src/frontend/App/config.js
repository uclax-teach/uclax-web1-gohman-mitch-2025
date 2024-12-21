const {
    VITE_APP_CONFIG_STUDENT_NAME,
    VITE_APP_CONFIG_TITLE,
    VITE_APP_CONFIG_TAGLINE,
    VITE_APP_CONFIG_LOCATION,
    VITE_API_URL,
    VITE_RECAPTCHA_SITE_KEY,
} = import.meta.env;

export const config = {
    profile: {
        studentName: VITE_APP_CONFIG_STUDENT_NAME,
        title: VITE_APP_CONFIG_TITLE,
        tagline: VITE_APP_CONFIG_TAGLINE,
        location: VITE_APP_CONFIG_LOCATION,
    },
    app: {
        apiUrl: VITE_API_URL,
        recaptchaSiteKey: VITE_RECAPTCHA_SITE_KEY,
    },
};
