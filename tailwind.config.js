/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Global safeguard: force all border radii to 0px.
    // This means even accidental rounded-* utilities resolve to 0px.
    borderRadius: {
      none: "0px",
      sm: "0px",
      DEFAULT: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px"
    },
    extend: {
      colors: {
        charcoal: "#1b1b1d",
        ink: "#111113",
        sand: "#f6f2ec",
        cream: "#faf8f4",
        paper: "#ffffff",
        line: "#e7dfd2",
        muted: "#5e5b55",
        gold: "#c8a25a"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(17, 17, 19, 0.2)",
        card: "0 16px 50px rgba(17, 17, 19, 0.10)"
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
        xl: "2.5rem"
      }
    }
  },
  plugins: []
};
