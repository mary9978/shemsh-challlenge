import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#212121",
        secondary: "#7D7E7F",
        cardBackground: "#FFFCF4",
        grayDark: "#333333",
        grayMed: "#666666",
        bgLight: "#FFF9F1",
        accent: "#C99E38",
        light: "#D7DEE0",
        muted: "#ABA8B2",
        success: "#4CAF50",
        lightpurple: "#DED8F1",
        highlight: "#B9A2FD",
      },
      fontFamily: {
        IRANSansX: ["IRANSansX", "sans-serif"],
        yekanBakh: ["YekanBakh", "sans-serif"],
      },
      boxShadow: {
        "custom-card": "0px 0px 10px -4px #00000024, 0px 2px 12px -2px #0000001A",
      },
      fontSize: {
        "10px": "10px",  
        "11px": "11px",
      },
    },
  },
  plugins: [],
};
export default config;
