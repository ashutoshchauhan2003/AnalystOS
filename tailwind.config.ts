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
        background: "#040914",
        foreground: "#f8fbff",
        accent: "#67e8f9",
      },
      boxShadow: {
        glow: "0 0 40px rgba(103, 232, 249, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
