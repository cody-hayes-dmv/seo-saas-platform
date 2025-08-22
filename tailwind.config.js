/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#daeaff",
          200: "#b7d2ff",
          300: "#8eb5ff",
          400: "#5c89ff",
          500: "#3d63ff", // primary
          600: "#2e4ee6",
          700: "#253ec0",
          800: "#22379c",
          900: "#1e2f80",
        },
        accent: {
          500: "#f43f5e", // rose
          600: "#e11d48",
        },
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.20)",
        glow: "0 10px 40px -12px rgba(61,99,255,0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        radial:
          "radial-gradient(1200px 600px at 80% -20%, rgba(61,99,255,0.25), transparent 60%), radial-gradient(800px 400px at -10% 10%, rgba(244,63,94,0.2), transparent 50%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(61,99,255,0.18), rgba(244,63,94,0.18))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
