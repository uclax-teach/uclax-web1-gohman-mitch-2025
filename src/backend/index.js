/**
 * Express Server
 */
// Libraries
import process from "process";
import path from "path";
import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";

// Custom
import corsConfig from "./corsConfig.js";
import getSecretsAndCheckEnvVars from "./getSecretsAndCheckEnvVars.js";
import apiRouter from "./routes.js";

const serve = async () => {
    /* init ---------------------------*/
    const app = express();

    /* Support for JSON responses ---------------------------*/
    app.use(express.json());

    /*---------------------------
    | Dotenv
    ---------------------------*/
    dotenv.config({
        path: path.resolve(process.cwd(), ".env"), // Absolute path to .env file in root directory
    });

    /*---------------------------
    | Add Environment Variables to secrets object
    ---------------------------*/
    const secrets = getSecretsAndCheckEnvVars([
        "REACT_URL",
        "JSON_SERVER_URL",
        "API_URL",
        "CORS_DOMAINS",
        "SENDGRID_API_KEY",
        "SENDGRID_FROM_EMAIL",
    ]);
    app.set("secrets", secrets);

    /*---------------------------
    | HTTP Headers: Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
    ---------------------------*/
    app.use(helmet());

    /*---------------------------
    | Middleware ::
    ---------------------------*/
    /*
        Sometimes missing and depends on how headers are sent.
        Like from HOST of docker container
        https://stackoverflow.com/a/61394342
    ---------------------------*/
    app.use(function (req, res, next) {
        req.headers.origin = req.headers.origin || req.headers.host;
        next();
    });

    /*---------------------------
    | CORS :: Local Developemt
    | Our React FE needs to be able to tap this API
    ---------------------------*/
    app.use(corsConfig(secrets.CORS_DOMAINS));

    /*---------------------------
    | API Routes
    ---------------------------*/
    app.use("/", apiRouter);

    /*---------------------------
    | Start Server
    ---------------------------*/
    const PORT = 5999;

    app.listen(PORT, () => {
        console.log(`
            Express Server is up and running. Currently listening on port: ${PORT}
            API Server: http://localhost:${PORT}
        `);
    });
};

serve();
