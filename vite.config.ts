import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@rootComponents": path.resolve(__dirname, "./src/components"),
            "@auth": path.resolve(__dirname, "./src/modules/auth"),
            "@drive": path.resolve(__dirname, "./src/modules/drive"),
        },
    },
    plugins: [react()],
});
