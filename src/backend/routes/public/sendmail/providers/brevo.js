import BrevoApi from "sib-api-v3-sdk";

// Set up Brevo Instance
const brevoApiInit = (apiKey) => {
    if (!apiKey || apiKey === "EMAIL_BREVO_API_KEY") {
        console.info(
            "[BACKEND]: EMAIL_BREVO_API_KEY Missing. Brevo Email Api will not be configured"
        );
        return;
    }

    const brevoClient = BrevoApi.ApiClient.instance;
    const brevoApiKey = brevoClient.authentications["api-key"];
    brevoApiKey.apiKey = apiKey;

    // Set up email API instance
    return new BrevoApi.TransactionalEmailsApi();
};

export const brevo = () => {
    const send = async ({
        apiKey,
        from,
        html,
        text,
        replyTo,
        subject,
        recipients,
        res,
    }) => {
        try {
            console.log("Sending Brevo Email");
            const brevoProps = {
                sender: from,
                to: recipients,
                replyTo,
                subject,
                htmlContent: html,
                textContent: text,
            };

            console.log({ brevoProps });

            const brevoApi = brevoApiInit(apiKey);
            const response = await brevoApi.sendTransacEmail(brevoProps);
            res.status(200).json({ success: true, response });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    };

    return {
        send,
    };
};
