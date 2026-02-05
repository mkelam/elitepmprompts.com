import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Handle both structure types
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Extra small breakpoint for mobile
      },
      colors: {
        nexus: {
          dark: "#0F172A",    // Deep Slate/Charcoal
          glass: "rgba(15, 23, 42, 0.6)", // Darker glass for industrial feel
          cyan: "#06B6D4",    // Cyan accent
          violet: "#8B5CF6",  // Violet accent
        },
        glass: {
          100: "rgba(255, 255, 255, 0.05)", // Fainter for dark mode
          200: "rgba(255, 255, 255, 0.1)",
          300: "rgba(255, 255, 255, 0.2)",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "circuit-board": "url('/images/ProjectManagersNexus.png')",
      },
    },
  },
  plugins: [],
};
export default config;
