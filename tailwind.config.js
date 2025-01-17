/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "0px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1200px",
      },
      fontFamily: {
        Poppins: "var(--heading-font)",
        roboto: "var(--default-font)",
        raleway: "var(--nav-font)",
        font_awesome: "var(--fa-font-solid)",
      },
      colors: {
        bgColor: "var( --background-color)",
        sidebar: "var(--side-bar)",
        titleBorder: "var(--title-border)",
        defaultColor: "var(--default-color)",
        headingColor: "var(--heading-color)",
        accentColor: "var(--accent-color)",
        surfaceColor: "var(--surface-color)",
        contrastColor: "var(--contrast-color)",
        navColor: "var(--nav-color)",
        navHoverColor: "var(--nav-hover-color)",
        navMobileBgColor: "var(--nav-mobile-background-color)",
      },
    },
  },
  plugins: [],
};
