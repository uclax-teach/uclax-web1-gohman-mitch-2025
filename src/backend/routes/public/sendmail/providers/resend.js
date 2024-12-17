import { Resend } from "resend";

import {
    convertToEmailsToArray,
    convertToNameAndEmail,
    composeHtmlBodyMessage,
    composeSubject,
} from "../utils.js";

const PROVIDER = "Resend";

export const resend = () => {
    const send = async ({
        apiKey,
        from,
        subjectPrefix,
        recipients,
        requestBody,
        res,
    }) => {
        console.log("Sending Resend Email");

        const { userName, userEmail, userMessage } = requestBody; // Contact Form Vars

        const resend = new Resend(apiKey);
        const to = convertToEmailsToArray(recipients);
        const recipient = to[0] ? convertToNameAndEmail(to[0]) : "Recipient";

        const emailData = {
            from: from.trim(),
            to,
            replyTo: userEmail,
            subject: composeSubject(subjectPrefix, userName, PROVIDER),
            html: composeHtmlBodyMessage(
                recipient,
                userName,
                userMessage,
                PROVIDER
            ),
        };

        console.log({ emailData });

        try {
            const response = await resend.emails.send(emailData);
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
