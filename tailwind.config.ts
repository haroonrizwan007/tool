import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1b3a",
        muted: "#5b6b8c",
        line: "#e3e9f5",
        surface: "#f6f8fd",
        brand: {
          50: "#eef3ff",
          100: "#dce7ff",
          200: "#b9ceff",
          500: "#2f62f0",
          600: "#1f4fe0",
          700: "#1a3fb8",
          900: "#0f2466",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,36,102,.04), 0 8px 24px -8px rgba(15,36,102,.10)",
        lift: "0 2px 4px rgba(15,36,102,.05), 0 16px 36px -12px rgba(31,79,224,.22)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};

export default config;
