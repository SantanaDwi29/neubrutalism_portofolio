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
        "inverse-primary": "#dfc64b",
        "on-secondary-container": "#6d0010",
        "on-primary-fixed": "#211b00",
        "on-primary": "#ffffff",
        "surface-container": "#f4eddf",
        "secondary": "#ae2f34",
        "primary-container": "#ffe566",
        "primary": "#6d5e00",
        "on-surface": "#1e1c13",
        "error": "#ba1a1a",
        "secondary-container": "#ff6b6b",
        "on-secondary-fixed": "#410006",
        "secondary-fixed-dim": "#ffb3b0",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#004c6a",
        "on-primary-container": "#766500",
        "surface-dim": "#e0d9cc",
        "tertiary-container": "#cae9ff",
        "background": "#fff9ed",
        "on-secondary-fixed-variant": "#8c1520",
        "surface-bright": "#fff9ed",
        "surface": "#fff9ed",
        "on-error": "#ffffff",
        "outline-variant": "#cec6b0",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "outline": "#7d7763",
        "secondary-fixed": "#ffdad8",
        "on-primary-fixed-variant": "#524600",
        "surface-variant": "#e8e2d4",
        "primary-fixed": "#fce264",
        "on-background": "#1e1c13",
        "inverse-on-surface": "#f7f0e2",
        "inverse-surface": "#333027",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#6d5e00",
        "tertiary-fixed-dim": "#7dd0ff",
        "tertiary-fixed": "#c4e7ff",
        "tertiary": "#00658b",
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#dfc64b",
        "surface-container-highest": "#e8e2d4",
        "on-tertiary-fixed": "#001e2d",
        "on-surface-variant": "#4b4736",
        "surface-container-low": "#faf3e5",
        "surface-container-high": "#eee8da",
        "on-tertiary-container": "#006d95"
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
