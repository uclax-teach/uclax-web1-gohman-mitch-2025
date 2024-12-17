export const convertToEmailsToArray = (csvString) => {
    // split and remove any whitespace on left and right of each value
    return csvString.split(",").map((str) => str.trim());
};

// convert email format to name and email
export const convertToNameAndEmail = (emailString) => {
    // Split the trimmed item by "<" to separate name and email
    const [name, email] = emailString.split("<");

    return {
        name: name.trim(), // Trim spaces around the name
        email: email.replace(">", "").trim(), // Remove ">" and trim email
    };
};

// Convert combined string to array of { name, email }
export const convertToEmailsToArrOfObjects = (emailString) => {
    return convertToEmailsToArray(emailString).map((item) => {
        return convertToNameAndEmail(item);
    });
};

/*---------------------------
| Compose Email
---------------------------*/
export const composeSubject = (subjectPrefix, userName, provider) => {
    return `${subjectPrefix}: Contact Form: ${userName} - powered by ${provider}`;
};

export const composeHtmlBodyMessage = (
    recipient,
    userName,
    userMessage,
    provider
) => {
    return `
            <p>Hey ${recipient},</p>
            <p>You have a Website message from ${userName}:</p>
            <p>${userMessage}</p>
            <p>Cheers,<br>Your Web Team</p>
            <p>Powered By ${provider}</p>
        `;
};
