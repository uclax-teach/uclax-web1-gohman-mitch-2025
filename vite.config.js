import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
