import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@auth": path.resolve(__dirname, "./src/features/authentication"),
            "@fileHandling": path.resolve(
                __dirname,
                "./src/features/fileHandling"
            ),
            "@notification": path.resolve(
                __dirname,
                "./src/features/notification"
            ),
            "@modal": path.resolve(__dirname, "./src/features/modal"),
        },
    },
    plugins: [react()],
});
