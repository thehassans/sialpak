import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#122043", 2: "#0d1830" },
        brand: { DEFAULT: "#1f6fdb", dark: "#1856ac", pale: "#eef4fd" },
        ink: "#1b2436",
        sub: "#6b7688",
        line: "#e6eaf1",
        bg: "#f6f8fb",
        success: "#2fa84f",
        danger: "#e0362c",
        warn: "#f5921f",
        star: "#f5a623",
        gold: "#f2b23c"
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      boxShadow: {
        card: "0 2px 10px rgba(18,32,67,.06)",
        lg2: "0 12px 32px rgba(18,32,67,.14)"
      },
      borderRadius: { xl2: "14px" }
    }
  },
  plugins: []
};
export default config;
