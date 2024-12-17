import { MailtrapClient } from "mailtrap";

export const mailtrap = () => {
    const send = async ({
        token,
        testInboxId,
        from,
        html,
        text,
        replyTo,
        subject,
        recipients,
        res,
    }) => {
        try {
            console.log("Sending Mailtrap Email");

            const mailtrapOptions = {
                from,
                to: recipients,
                // replyTo, // does not like this prop, seems to be an upgrade feature.
                subject,
                text,
                html,
                category: "Integration Test",
            };

            console.log({ mailtrapOptions });

            console.log({ token, testInboxId });

            const client = new MailtrapClient({
                token,
                testInboxId,
            });

            const response = await client.testing.send(mailtrapOptions);

            res.status(200).json({
                success: true,
                response,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    };

    return {
        send,
    };
};
