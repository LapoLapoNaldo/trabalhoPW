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
        "fluid-display":
          "clamp(2.8rem, 1.4rem + 6.2vw, 6.6rem)",
        "fluid-mega":
          "clamp(3.6rem, 1.4rem + 8.8vw, 8.8rem)"
      },
      letterSpacing: {
        "tightest": "-0.045em",
        "editorial": "-0.025em",
        "kicker": "0.32em"
      },
      lineHeight: {
        "display": "0.92",
        "editorial": "1.06"
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(156, 89, 209, 0.55)",
        "yellow-glow": "0 12px 50px -8px rgba(255, 244, 48, 0.32)",
        "card": "0 24px 80px -32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset",
        "card-hover":
          "0 40px 120px -28px rgba(124, 63, 203, 0.45), 0 1px 0 rgba(255,255,255,0.08) inset",
        "ring-soft":
          "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px -28px rgba(0,0,0,0.65)",
        "halo":
          "0 0 100px -10px rgba(255, 244, 48, 0.18), 0 0 240px -40px rgba(156, 89, 209, 0.45)"
      },
      backgroundImage: {
        "nonbinary-conic":
          "conic-gradient(from 180deg at 50% 50%, #FFF430, #FFFFFF, #9C59D1, #000000, #FFF430)",
        "aurora":
          "radial-gradient(60% 50% at 20% 20%, rgba(255,244,48,0.22), transparent 60%), radial-gradient(45% 50% at 80% 20%, rgba(91,206,250,0.20), transparent 60%), radial-gradient(50% 60% at 70% 80%, rgba(156,89,209,0.32), transparent 60%), radial-gradient(40% 40% at 20% 80%, rgba(255,106,174,0.20), transparent 60%)",
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")"
      },
      transitionTimingFunction: {
        "cinema": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        },
        floatSubtle: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0)" },
          "50%": { transform: "translate3d(0,-8px,0) rotate(0.4deg)" }
        },
        wave: {
          "0%, 100%": { transform: "rotate(10deg)" },
          "50%": { transform: "rotate(-22deg)" }
        },
        blink: {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.06)" }
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.08)", opacity: "1" }
        },
        heartbeat: {
          "0%, 60%, 100%": { transform: "scale(1)" },
          "20%": { transform: "scale(1.18)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.10)" }
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(var(--x), var(--y), 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(1.04)" }
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(2%, -3%, 0) rotate(0.4deg)" },
          "66%": { transform: "translate3d(-2%, 2%, 0) rotate(-0.4deg)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        beamFlow: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 200%" }
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(28px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" }
        },
        revealWord: {
          "0%": { opacity: "0", transform: "translateY(60%)", filter: "blur(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" }
        },
        ringExpand: {
          "0%": { transform: "scale(0.6)", opacity: "0.85" },
          "100%": { transform: "scale(1.6)", opacity: "0" }
        },
        tickerLight: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        float: "float 6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        floatSubtle: "floatSubtle 7s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        wave: "wave 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        blink: "blink 4.6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        breathe: "breathe 5s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        heartbeat: "heartbeat 2.6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        drift: "drift var(--duration, 14s) cubic-bezier(0.45, 0, 0.55, 1) infinite",
        shimmer: "shimmer 8s linear infinite",
        pulseGlow: "pulseGlow 6s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        aurora: "aurora 22s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        marquee: "marquee 38s linear infinite",
        beamFlow: "beamFlow 6s linear infinite",
        revealUp: "revealUp 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
        revealWord: "revealWord 1100ms cubic-bezier(0.22, 1, 0.36, 1) both",
        ringExpand: "ringExpand 1200ms cubic-bezier(0.22, 1, 0.36, 1) both",
        tickerLight: "tickerLight 3s cubic-bezier(0.45, 0, 0.55, 1) infinite"
      }
    }
  },
  plugins: []
};

export default config;
