import axios from "axios";

export const convertCsvToArray = (csvString) => {
    // split and remove any whitespace on left and right of each value
    return csvString.split(",").map((str) => str.trim());
};

export const convertRfcEmailStrToObject = (rfcEmailStr) => {
    // Split the trimmed item by "<" to separate name and email
    const [name, email] = rfcEmailStr.split("<");

    return {
        name: name.trim(), // Trim spaces around the name
        email: email.replace(">", "").trim(), // Remove ">" and trim email
    };
};

// Convert combined string to array of { name, email }
export const convertRfcEmailCsvStrToArrOfObjects = (emailString) => {
    return convertCsvToArray(emailString).map((item) => {
        return convertRfcEmailStrToObject(item);
    });
};

export const convertObjectToRfcEmail = ({ name, email }) => {
    return `${name} <${email}>`;
};

export const convertArrayOfObjectsToRfcEmails = (arrOfObjects) => {
    return arrOfObjects.map(convertObjectToRfcEmail);
};

export const generateNormalizedEmailProps = (
    email,
    requestBody,
    providerConfig,
    res
) => {
    const recipients = convertRfcEmailCsvStrToArrOfObjects(email.recipients);
    const recipient = recipients[0];

    console.log({ recipient });

    const titleCaseProvider =
        email.emailProvider.charAt(0).toUpperCase() +
        email.emailProvider.slice(1);
    const replyTo = {
        name: requestBody.userName,
        email: requestBody.userEmail,
    };
    const from = convertRfcEmailStrToObject(providerConfig.from);
    const { html, text } = composeMessageBody(
        recipient,
        requestBody.userName,
        requestBody.userMessage,
        titleCaseProvider
    );
    const subject = composeSubject(
        email.subjectPrefix,
        requestBody.userName,
        titleCaseProvider
    );

    return {
        ...providerConfig,
        from,
        html,
        text,
        replyTo,
        subject,
        recipients,
        recipient,
        res,
    };
};

/*---------------------------
| Compose Email
---------------------------*/
export const composeSubject = (subjectPrefix, userName, provider) => {
    return `${subjectPrefix}: Contact Form: ${userName} - powered by ${provider}`;
};

export const composeMessageBody = (
    recipient,
    userName,
    userMessage,
    provider
) => {
    return {
        text: `
            Hey ${recipient?.name},

            You have a website message from ${userName}:

            ${userMessage}

            Cheers,
            Your Web Team

            Powered By ${provider}
        `,
        html: `
            <p>Hey ${recipient?.name},</p>
            <p>You have a Website message from ${userName}:</p>
            <p>${userMessage}</p>
            <p>Cheers,<br>Your Web Team</p>
            <p>Powered By ${provider}</p>
        `,
    };
};

/*---------------------------
| Google Recaptcha
---------------------------*/
export const verifyGoogleRecaptcha = async (secretKey, token) => {
    const resp = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    console.log({ recpatchaResp: resp?.data });
    return resp?.data?.success;
};
