import BrevoApi from "sib-api-v3-sdk";

import {
    convertToNameAndEmail,
    convertEmailStringToArray,
    composeHtmlBodyMessage,
    composeSubject,
} from "../utils.js";

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
        subjectPrefix,
        toEmails,
        requestBody,
        res,
    }) => {
        console.log("Sending Brevo Email");

        const { userName, userEmail, userMessage } = requestBody; // Contact Form Vars
        const brevoApi = brevoApiInit(apiKey);
        const to = convertEmailStringToArray(toEmails);
        const provider = "Brevo";
        const recipient = to[0]?.name || "Recipient";

        const emailData = {
            sender: convertToNameAndEmail(from),
            to,
            replyTo: { name: userName, email: userEmail },
            subject: composeSubject(subjectPrefix, userName, provider),
            htmlContent: composeHtmlBodyMessage(
                recipient,
                userName,
                userMessage,
                provider
            ),
        };

        try {
            const response = await brevoApi.sendTransacEmail(emailData);
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
