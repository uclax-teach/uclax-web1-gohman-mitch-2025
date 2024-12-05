import cors from "cors";

const corsConfig = (corsDomainsStr) => {
    // Clean up the CSV string and split it into an array of allowed domains
    const corsDomains = corsDomainsStr.replace(/\s+/g, "").split(",");

    const corsOptions = {
        origin: (origin, callback) => {
            // Allow if origin is in the corsDomains list
            if (corsDomains.includes(origin)) {
                return callback(null, true);
            }

            // Block the request with an error message
            return callback(new Error(`'${origin}' Not allowed by CORS`));
        },
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    };

    return cors(corsOptions);
};

export default corsConfig;
