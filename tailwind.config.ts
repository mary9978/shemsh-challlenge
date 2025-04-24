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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#212121',
        secondary: '#7D7E7F',  
        accent: '#C99E38',      
        light: '#D7DEE0',       
        muted: '#ABA8B2',       
        success: '#4CAF50',     
        highlight: '#B9A2FD',  
      },
    },
  },
  plugins: [],
};
export default config;
