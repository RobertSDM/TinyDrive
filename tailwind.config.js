/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                "contentView": '2fr 1fr 1fr'
            }
        },
    },
    plugins: [],
};
