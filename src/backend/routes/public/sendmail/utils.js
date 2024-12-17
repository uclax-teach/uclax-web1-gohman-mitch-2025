// convert email format to name and email
export const convertToNameAndEmail = (emailString) => {
    // Trim spaces from each item before splitting
    const trimmedEmailStr = emailString.trim();

    // Split the trimmed item by "<" to separate name and email
    const [name, email] = trimmedEmailStr.split("<");

    return {
        name: name.trim(), // Trim spaces around the name
        email: email.replace(">", "").trim(), // Remove ">" and trim email
    };
};

// Convert combined string to array of { name, email }
export const convertEmailStringToArray = (emailString) => {
    return emailString.split(",").map((item) => {
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
