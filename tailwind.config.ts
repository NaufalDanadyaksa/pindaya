import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8D6E63", // Earthy Brown
          light: "#A1887F",
          dark: "#5D4037",
        },
        secondary: {
          DEFAULT: "#F5E6CA", // Cream / Batik Wax
          light: "#FFF8E1",
          dark: "#D7CCC8",
        },
        accent: {
          DEFAULT: "#D4AF37", // Metallic Gold
          light: "#FBC02D",
          dark: "#Bcaaa4",
        },
        dark: {
          DEFAULT: "#1F100B", // Deep Coffee Brown
          light: "#3E2723", // Dark Brown
          lighter: "#4E342E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #1F100B 0%, #3E2723 50%, #1F100B 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(200, 155, 60, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(200, 155, 60, 0.6)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
