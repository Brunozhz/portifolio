/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        night: "#000000",
        panel: "#08080A",
        panelSoft: "#0C0C10",
        ink: "#E8ECF3",
        inkSoft: "#B8C0D0",
        inkMute: "#7A8294",
        violet: "#8B5CF6",
        nebula: "#A855F7",
        electric: "#6366F1",
        cyan: "#22D3EE",
        sky: "#38BDF8",
        champagne: "#D8C79A",
        pearl: "#F5F3EE",
        mist: "#A1A1AA"
      },
      fontFamily: {
        display: ["var(--font-display)", "Montserrat", "sans-serif"],
        sans: ["var(--font-body)", "Sora", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(139, 92, 246, 0.22)",
        cyanGlow: "0 0 50px rgba(34, 211, 238, 0.18)",
        champagne: "0 0 60px rgba(216, 199, 154, 0.18)",
        card: "0 28px 80px rgba(0, 0, 0, 0.45)",
        innerTop: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        depth: "0 40px 120px -30px rgba(0, 0, 0, 0.7)"
      },
      backdropBlur: {
        xs: "4px"
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(20px, -28px, 0) scale(1.06)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        orbit: "orbit 60s linear infinite",
        drift: "drift 14s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
