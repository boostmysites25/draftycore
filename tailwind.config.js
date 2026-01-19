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
                'big-shoulders': ['Coolvetica', 'sans-serif'],
                // 'big-shoulders': ['Big Shoulders', 'sans-serif'],
                'octin-college': ['Academy Filled 3D', 'sans-serif'], // Replaced Octin College with Academy
                'f37-judge': ['Coolvetica', 'sans-serif'],
                'f37-judge-condensed': ['Coolvetica', 'sans-serif'],
                // 'f37-judge': ['F37 Judge', 'sans-serif'],
                // 'f37-judge-condensed': ['F37 Judge Condensed', 'sans-serif'],
                'coolvetica': ['Coolvetica', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
