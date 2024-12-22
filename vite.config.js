import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from two directories up
config({ path: resolve(__dirname, "./.env") });

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.md"], // Ensure .md files are treated as assets
    root: "src/frontend", // Set the root folder to 'src'
    server: {
        port: 3999,
    },
    resolve: {
        alias: {
            "@App": "/App",
            "@Theme": "/App/Theme",
            "@Layout": "/App/Layout",
            "@Pages": "/App/Pages",
            "@Core": "/App/Core",
            "@Routes": "/App/Routes",
        },
    },
    build: {
        outDir: "./build",
        chunkSizeWarningLimit: 1600,
    },
});
