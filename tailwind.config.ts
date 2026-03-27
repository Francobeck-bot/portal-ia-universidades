import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ufrgs-dark":       "#1F3864",
        "ufrgs-blue":       "#2E75B6",
        "ufrgs-light":      "#4A90D9",
        "ufrgs-gold":       "#C9A227",
        "ufrgs-gold-light": "#F0C842",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundSize: {
        "300%": "300%",
      },
      keyframes: {
        "gradient-shift": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 10s ease infinite",
        "fade-in-up":     "fade-in-up 0.6s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
