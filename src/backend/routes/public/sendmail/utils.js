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
