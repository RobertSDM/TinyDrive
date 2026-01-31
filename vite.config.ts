import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@auth": path.resolve(__dirname, "./src/features/authentication"),
            "@fileHandling": path.resolve(
                __dirname,
                "./src/features/fileHandling"
            ),
            "@notify": path.resolve(__dirname, "./src/features/notification"),
        },
    },
    plugins: [react()],
});
