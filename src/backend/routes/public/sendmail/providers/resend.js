export const resend = () => {
    const send = async ({
        apiKey,
        from,
        subjectPrefix,
        toEmails,
        requestBody,
        res,
    }) => {
        console.log("Sending Resend Email");

        // try {
        // const response = await brevoApi.sendTransacEmail(emailData);
        res.status(200).json({ success: true, response: "Resend Email Sent" });
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ success: false, error: error.message });
        // }
    };

    return {
        send,
    };
};
