import {
    convertToEmailsToArray,
    convertToNameAndEmail,
    composeHtmlBodyMessage,
    composeSubject,
} from "../utils.js";

const PROVIDER = "Mailtrap";

export const mailtrap = () => {
    const send = async ({
        host,
        port,
        user,
        pass,
        subjectPrefix,
        recipients,
        requestBody,
        res,
    }) => {
        console.log("Sending Mailtrap Email");

        // try {
        // const response = await brevoApi.sendTransacEmail(emailData);
        res.status(200).json({
            success: true,
            response: "Mailtrap Email Sent",
        });
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ success: false, error: error.message });
        // }
    };

    return {
        send,
    };
};
