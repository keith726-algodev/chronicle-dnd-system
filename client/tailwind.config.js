/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#0B1026",
        surface: "#1B2340",
        "accent-ice": "#9FD8FF",
        "accent-gold": "#D9B36C",
        "text-primary": "#F2F4FA",
        "text-muted": "#A9B2CC",
      },
      spacing: {
        "token-xs": "4px",
        "token-sm": "8px",
        "token-md": "16px",
        "token-lg": "24px",
        "token-xl": "40px",
      },
      backgroundImage: {
        "grad-tile": "linear-gradient(145deg, #232C55 0%, #1B2340 55%, #2A2250 100%)",
        "grad-accent": "linear-gradient(135deg, #9FD8FF 0%, #B9B6FF 100%)",
        "grad-gold": "linear-gradient(135deg, #D9B36C 0%, #F2D9A0 100%)",
        "grad-header": "linear-gradient(90deg, #0B1026 0%, #171C42 100%)",
      },
      borderRadius: {
        "token-card": "12px",
      },
      fontFamily: {
        base: ["Inter", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Inter", "serif"],
      },
      fontSize: {
        "size-1": "12px",
        "size-2": "14px",
        "size-3": "16px",
        "size-4": "20px",
        "size-5": "24px",
        "size-6": "32px",
      },
      screens: {
        sm: "640px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
};
