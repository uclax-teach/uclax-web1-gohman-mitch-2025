import process from "process";
import BrevoApi from "sib-api-v3-sdk";

// Parse Required Env Vars
export const parseReqEnvVars = (requiredVars) => {
    const missingVars = requiredVars.filter((envVar) => !process.env[envVar]);

    if (missingVars.length > 0) {
        console.error(
            `Missing required environment variables: ${missingVars.join(", ")}`
        );
        process.exit(1); // Exit if critical variables are missing
    }

    // Return the secrets object dynamically using the required vars
    const secrets = requiredVars.reduce((acc, envVar) => {
        acc[envVar] = process.env[envVar];
        return acc;
    }, {});

    return secrets;
};

// Configure Email API: Brevo
export const configureEmailApi = (apiKey) => {
    if (!apiKey || apiKey === "BREVO_API_KEY") {
        console.info(
            "[BACKEND]: BREVO_API_KEY Missing. Brevo Email Api will not be configured"
        );
        return;
    }

    const brevoClient = BrevoApi.ApiClient.instance;
    const brevoApiKey = brevoClient.authentications["api-key"];
    brevoApiKey.apiKey = apiKey;

    // Set up email API instance
    return new BrevoApi.TransactionalEmailsApi();
};
