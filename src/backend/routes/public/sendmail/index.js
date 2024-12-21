import express from "express";
const sendmailRoutes = express.Router();

import {
    generateNormalizedEmailProps,
    verifyGoogleRecaptcha,
} from "./utils.js";

// Email Service Providers
import { mailtrap } from "./providers/mailtrap.js";
import { resend } from "./providers/resend.js";
import { brevo } from "./providers/brevo.js";

sendmailRoutes.post("/", async (req, res) => {
    const { email } = req.app.get("secrets");
    const requestBody = req.body; // Contact Form Vars

    const verified = await verifyGoogleRecaptcha(
        email.reCaptcha.secretKey,
        requestBody.token
    );
    if (!verified) {
        return res
            .status(400)
            .json({ message: "reCAPTCHA verification failed" });
    }

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
