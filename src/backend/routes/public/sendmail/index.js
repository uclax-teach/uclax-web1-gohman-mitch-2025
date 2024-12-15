import express from "express";
const sendmailRoutes = express.Router();
import { convertToNameAndEmail, convertEmailStringToArray } from "./utils.js";

sendmailRoutes.post("/", async (req, res) => {
    // Contact Form Vars
    const { userName, userEmail, userMessage } = req.body;

    // Secrets From Env and Config
    const {
        email: { api, subjectPrefix, senderEmail, toEmails },
    } = req.app.get("secrets");

    if (!api) {
        console.error(
            "[BACKEND]: You must first setup BREVO_API_KEY in your .env if you want to use this route."
        );
        return;
    }

    const to = convertEmailStringToArray(toEmails);

    const emailData = {
        sender: convertToNameAndEmail(senderEmail),
        to,
        replyTo: { name: userName, email: userEmail },
        subject: `${subjectPrefix}: Contact Form: ${userName}`,
        htmlContent: `
            <p>Hey ${to[0]?.name || "Recipient"},</p>

            You have a Website message from ${userName}:

            <p>${userMessage}</p>

            <p>Cheers,<br>Your Web Team</p>
        `,
    };

    try {
        const response = await api.sendTransacEmail(emailData);
        res.status(200).json({ success: true, response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default sendmailRoutes;
