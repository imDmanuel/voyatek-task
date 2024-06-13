import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        success: {
          100: "hsla(140, 45%, 94%)",
          600: "hsla(140, 82%, 33%)",
        },
        neutral: {
          200: "rgba(226, 232, 240)",
          300: "hsla(213, 27%, 84%)",
          400: "hsla(215, 20%, 65%)",
          600: "hsla(215, 19%, 35%)",
          700: "hsla(215, 25%, 27%)",
          800: "hsla(217, 33%, 17%)",
          1000: "rgba(29, 39, 57)",
        },
        black: {
          secondary: "hsla(214, 20%, 49%)",
        },
        grey: {
          300: "rgba(208, 213, 221)",
          500: "hsla(219, 13%, 46%)",
          700: "hsla(217, 24%, 27%)",
          900: "hsla(218, 43%, 11%)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          50: "hsla(215, 92%, 97%)",
          200: "hsla(215, 97%, 91%)",
          400: "hsla(216, 98%, 78%, 1)",
          600: "hsl(216, 98%, 52%)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          100: "hsla(35, 92%, 95%)",
          600: "hsla(33, 94%, 49%)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        error: {
          100: "hsla(3, 69%, 95%)",
          300: "hsla(2, 67%, 76%)",
          600: "hsla(2, 74%, 48%)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
