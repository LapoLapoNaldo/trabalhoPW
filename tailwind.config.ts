import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          0: "#000000",
          50: "#08060f",
          100: "#0c0916",
          200: "#120c1f",
          300: "#1a1230",
          400: "#241846"
        },
        pride: {
          yellow: "#FFF430",
          white: "#FFFFFF",
          purple: "#9C59D1",
          black: "#000000",
          pink: "#FF6AAE",
          blue: "#5BCEFA",
          cyan: "#35E7D2",
          orange: "#FF9F45",
          plum: "#5B2A86",
          violet: "#7C3FCB",
          lilac: "#C9A6FF"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem)",
        "fluid-sm": "clamp(0.875rem, 0.82rem + 0.3vw, 0.95rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.3vw, 1.08rem)",
        "fluid-lg": "clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)",
        "fluid-xl": "clamp(1.4rem, 1.2rem + 0.9vw, 1.7rem)",
        "fluid-2xl": "clamp(1.8rem, 1.4rem + 1.6vw, 2.4rem)",
        "fluid-3xl": "clamp(2.4rem, 1.7rem + 2.6vw, 3.4rem)",
        "fluid-4xl": "clamp(3rem, 2rem + 3.4vw, 4.4rem)",
        "fluid-display": "clamp(2.6rem, 1.4rem + 5.6vw, 5.8rem)",
        "fluid-mega": "clamp(3.4rem, 1.4rem + 8vw, 8rem)"
      },
      letterSpacing: {
        tightest: "-0.045em",
        editorial: "-0.025em",
        kicker: "0.32em"
      },
      lineHeight: {
        display: "0.95",
        editorial: "1.1"
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(156, 89, 209, 0.55)",
        "yellow-glow": "0 12px 50px -8px rgba(255, 244, 48, 0.32)"
      },
      backgroundImage: {
        "nonbinary-conic":
          "conic-gradient(from 180deg at 50% 50%, #FFF430, #FFFFFF, #9C59D1, #000000, #FFF430)"
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(8deg)" },
          "50%": { transform: "rotate(-18deg)" }
        },
        blink: {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.06)" }
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        ringExpand: {
          "0%": { transform: "scale(0.6)", opacity: "0.85" },
          "100%": { transform: "scale(1.6)", opacity: "0" }
        }
      },
      animation: {
        wave: "wave 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        blink: "blink 4.6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        revealUp: "revealUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        ringExpand: "ringExpand 1000ms cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
