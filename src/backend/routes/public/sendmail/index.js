import express from "express";
const sendmailRoutes = express.Router();

import { generateNormalizedEmailProps } from "./utils.js";

// Email Service Providers
import { mailtrap } from "./providers/mailtrap.js";
import { resend } from "./providers/resend.js";
import { brevo } from "./providers/brevo.js";

sendmailRoutes.post("/", async (req, res) => {
    const { email } = req.app.get("secrets");
    const requestBody = req.body; // Contact Form Vars

    switch (email.emailProvider) {
        case "mailtrap":
            mailtrap().send(
                generateNormalizedEmailProps(
                    email,
                    requestBody,
                    email.providers.mailtrap,
                    res
                )
            );
            break;
        case "resend":
            resend().send(
                generateNormalizedEmailProps(
                    email,
                    requestBody,
                    email.providers.resend,
                    res
                )
            );
            break;
        case "brevo":
            brevo().send(
                generateNormalizedEmailProps(
                    email,
                    requestBody,
                    email.providers.brevo,
                    res
                )
            );
            break;
    }
});

export default sendmailRoutes;
