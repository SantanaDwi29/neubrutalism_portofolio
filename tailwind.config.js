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
        primary: "#800020",
        rose: "#D45060",
        cream: "#FFF9F2",
        sand: "#F3E6D5",
        page: "var(--manga-bg)",
        surface: "var(--manga-surface)",
        card: "var(--manga-surface-card)",
        ink: "var(--manga-paper)",
        muted: "var(--manga-muted)",
        line: "var(--manga-border)",
        strong: "var(--manga-border-strong)",
        action: "var(--action-bg)",
        "action-ink": "var(--action-text)"
      },
      borderRadius: {
        "DEFAULT": "4px",
        "lg": "8px",
        "xl": "12px",
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
