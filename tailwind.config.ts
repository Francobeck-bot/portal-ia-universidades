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
        "ufrgs-dark":  "#1F3864",
        "ufrgs-blue":  "#2E75B6",
        "ufrgs-gold":  "#C9A227",
        "grad-start":  "#004aad",
        "grad-end":    "#5de0e6",
      },
      fontFamily: {
        display: ["OPTIBakerDanmarkOne", "Georgia", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
