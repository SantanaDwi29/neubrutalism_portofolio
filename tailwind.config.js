/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "inverse-primary": "#D9B26F",
        "on-secondary-container": "#ffffff",
        "on-primary-fixed": "#211b00",
        "on-primary": "#ffffff",
        "surface-container": "#F5F5DC", // Light cream for main surfaces
        "secondary": "#C14953", // Merah Jepang
        "primary-container": "#D9B26F", // Gold Vintage
        "primary": "#C14953", // Merah Jepang
        "on-surface": "#1e1c13",
        "error": "#ba1a1a",
        "secondary-container": "#C14953", // Merah Jepang
        "on-secondary-fixed": "#410006",
        "secondary-fixed-dim": "#ffb3b0",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#004c6a",
        "on-primary-container": "#1e1c13",
        "surface-dim": "#e0d9cc",
        "tertiary-container": "#3E5C4A", // Hijau Gelap
        "background": "#F5F5DC", // Light cream
        "on-secondary-fixed-variant": "#8c1520",
        "surface-bright": "#F5F5DC",
        "surface": "#F5F5DC",
        "on-error": "#ffffff",
        "outline-variant": "#cec6b0",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "outline": "#1e1c13",
        "secondary-fixed": "#ffdad8",
        "on-primary-fixed-variant": "#524600",
        "surface-variant": "#e8e2d4",
        "primary-fixed": "#D9B26F", // Gold Vintage
        "on-background": "#1e1c13",
        "inverse-on-surface": "#f7f0e2",
        "inverse-surface": "#333027",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#C14953", // Merah Jepang
        "tertiary-fixed-dim": "#7dd0ff",
        "tertiary-fixed": "#c4e7ff",
        "tertiary": "#3E5C4A", // Hijau Gelap
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#D9B26F",
        "surface-container-highest": "#2F4858", // Biru Malam
        "on-tertiary-fixed": "#001e2d",
        "on-surface-variant": "#ffffff",
        "surface-container-low": "#faf3e5",
        "surface-container-high": "#eee8da",
        "on-tertiary-container": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      spacing: {
        "xl": "80px",
        "gutter": "24px",
        "xs": "4px",
        "md": "24px",
        "margin": "32px",
        "sm": "12px",
        "lg": "48px",
        "unit": "8px"
      },
      fontFamily: {
        "body-md": ["IBM Plex Mono", "monospace"],
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "label-bold": ["IBM Plex Mono", "monospace"],
        "body-lg": ["IBM Plex Mono", "monospace"],
        "headline-xl": ["Space Grotesk", "sans-serif"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-lg": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "label-bold": ["14px", { lineHeight: "1.2", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-xl": ["80px", { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "700" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
