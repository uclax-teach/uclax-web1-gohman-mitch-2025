import express from "express";
const sendmailRoutes = express.Router();

// Email Service Providers
import { mailtrap } from "./providers/mailtrap.js";
import { resend } from "./providers/resend.js";
import { brevo } from "./providers/brevo.js";

sendmailRoutes.post("/", async (req, res) => {
    const {
        email: { emailProvider, subjectPrefix, toEmails, providers },
    } = req.app.get("secrets");

    switch (emailProvider) {
        case "mailtrap":
            mailtrap().send({
                ...providers.mailtrap,
                subjectPrefix,
                toEmails,
                requestBody: { ...req.body },
                res,
            });
            break;
        case "resend":
            resend().send({
                ...providers.resend,
                subjectPrefix,
                toEmails,
                requestBody: { ...req.body },
                res,
            });
            break;
        case "brevo":
            brevo().send({
                ...providers.brevo,
                subjectPrefix,
                toEmails,
                requestBody: { ...req.body },
                res,
            });
            break;
    }
});

export default sendmailRoutes;
