/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                secondary: "#111111",
                brandorange: "#FF7A00",
                brandyellow: "#FFC300",
                brandpink: "#FF2D95",
                brandlimegreen: "#B8F135",
                brandturquoise: "#2ED9C3"
            },
            fontFamily: {
                'maus': ['MAUS', 'sans-serif'],
                'coolvetica': ['Coolvetica', 'sans-serif'],
                'coolvetica-condensed': ['F37 Judge Condensed', 'sans-serif'],
                'octin-college': ['MAUS', 'sans-serif'], // Fallback map to MAUS for easier migration
            },
        },
    },
    plugins: [],
}
