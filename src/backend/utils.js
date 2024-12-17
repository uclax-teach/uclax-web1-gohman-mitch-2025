import process from "process";

// Parse Required Env Vars
export const parseReqEnvVars = (requiredVars) => {
    const missingVars = requiredVars.filter((envVar) => !process.env[envVar]);

    if (missingVars.length > 0) {
        console.error(
            `Missing required environment variables: ${missingVars.join(", ")}`
        );
        process.exit(1); // Exit if critical variables are missing
    }

    // Return the secrets object dynamically using the required vars
    const secrets = requiredVars.reduce((acc, envVar) => {
        acc[envVar] = process.env[envVar];
        return acc;
    }, {});

    return secrets;
};
