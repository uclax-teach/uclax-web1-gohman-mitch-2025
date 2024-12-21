/**
 * Express Server
 */
// Libraries
import fs from "fs";
import path from "path";
import process from "process";
// Simulate __dirname in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";

// Custom
import corsConfig from "./corsConfig.js";
import { parseReqEnvVars } from "./utils.js";
import apiRouter from "./routes/index.js";

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
    | Secrets
    ---------------------------*/
    // Adding Required Environment Variables
    let secrets = parseReqEnvVars(["CORS_DOMAINS"]);

    // sending emails
    app.use(bodyParser.json());
    secrets.email = {
        emailProvider: process.env.EMAIL_PROVIDER,
        subjectPrefix: `${process.env.VITE_APP_CONFIG_TITLE} Website`,
        recipients: process.env.EMAIL_RECIPIENTS,
        providers: {
            mailtrap: {
                host: process.env.EMAIL_MAILTRAP_HOST,
                port: process.env.EMAIL_MAILTRAP_PORT,
                user: process.env.EMAIL_MAILTRAP_USER,
                pass: process.env.EMAIL_MAILTRAP_PASS,
                from: process.env.EMAIL_MAILTRAP_FROM,
                token: process.env.EMAIL_MAILTRAP_API_TOKEN,
                testInboxId: process.env.EMAIL_MAILTRAP_INBOX_ID,
            },
            resend: {
                apiKey: process.env.EMAIL_RESEND_API_KEY,
                from: process.env.EMAIL_RESEND_FROM,
            },
            brevo: {
                apiKey: process.env.EMAIL_BREVO_API_KEY,
                from: process.env.EMAIL_BREVO_FROM,
            },
        },
        reCaptcha: {
            secretKey: process.env.RECAPTCHA_SECRET_KEY,
        },
    };

    // make secrets available to APP API
    app.set("secrets", secrets);

    /*---------------------------
    | HTTP Headers: Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
    ---------------------------*/
    app.use(helmet());

    /*---------------------------
    | Middleware
    ---------------------------*/
    /**
     * Sometimes missing and depends on how headers are sent.
     * Like from HOST of docker container
     * https://stackoverflow.com/a/61394342
     */
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
    | reCAPTCHA Set Headers
    ---------------------------*/
    app.use((req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "script-src 'self' https://www.google.com https://www.gstatic.com; " + // Allow scripts from Google and Google Static
                "script-src-elem 'self' https://www.google.com https://www.gstatic.com; " + // Allow script elements from Google and Google Static
                "img-src 'self' https://www.gstatic.com; " + // Allow images from Google Static
                "frame-src https://www.google.com;" // Allow frames from Google (if necessary)
        );
        next();
    });

    /*---------------------------
    | API Routes
    ---------------------------*/
    app.use("/api", apiRouter);

    /*---------------------------
    | Vite React App
    ---------------------------*/
    // Define the path to the build folder
    const frontendBuildPath = path.resolve(__dirname, "../frontend/build");
    const fallbackHtmlPath = path.resolve(__dirname, "./fallback.html");

    if (fs.existsSync(frontendBuildPath)) {
        // Serve static files from the build directory
        app.use(express.static(frontendBuildPath));

        // Handle React app for any unmatched routes (SPA behavior)
        app.get("*", (req, res) => {
            res.sendFile(path.join(frontendBuildPath, "index.html"));
        });
    } else if (fs.existsSync(fallbackHtmlPath)) {
        console.warn(
            `[Backend] Warning: Build folder not found at ${frontendBuildPath}. Serving fallback HTML file.`
        );

        // Serve the fallback HTML file for all unmatched routes
        app.get("*", (req, res) => {
            res.sendFile(fallbackHtmlPath);
        });
    } else {
        console.warn(
            `[Backend] Warning: Build folder not found at ${frontendBuildPath}. Skipping static file serving.`
        );
    }

    /*---------------------------
    | Start Server
    ---------------------------*/
    app.listen(5999, () => {
        console.log(`
            Express Server is up and running. Currently listening on port: 5999
            API Server: http://localhost:5999
        `);
    });
};

serve();
