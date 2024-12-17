import { Resend } from "resend";

import {
    convertArrayOfObjectsToRfcEmails,
    convertObjectToRfcEmail,
} from "../utils.js";

export const resend = () => {
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
            console.log("Sending Resend Email");

            const resendOptions = {
                from: convertObjectToRfcEmail(from),
                to: convertArrayOfObjectsToRfcEmails(recipients),
                replyTo: convertObjectToRfcEmail(replyTo),
                subject,
                text,
                html,
            };

            console.log({ resendOptions });

            const resend = new Resend(apiKey);
            const response = await resend.emails.send(resendOptions);
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
