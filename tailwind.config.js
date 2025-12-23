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
                'big-shoulders': ['Big Shoulders', 'sans-serif'],
                'octin-college': ['Octin College', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
