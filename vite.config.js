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
    root: "src/frontend", // Set the root folder to 'src'
    server: {
        port: 3999,
    },
    resolve: {
        alias: {
            "@": "/src/frontend", // Alias for frontend files
        },
    },
    build: {
        outDir: "./build",
    },
});
