/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1400px",
        inner: "1128px",
      },
      fontFamily: {
        Poppins: "var(--heading-font)",
        roboto: "var(--default-font)",
        Pridi: "var(--sidebar-font)",
      },
      colors: {
        bgColor: "var( --background-color)",
        sidebar: "var(--side-bar)",
        defaultText: "var(--default-text)",
        bodyText: "var(--body-text)",
      },
    },
  },
  plugins: [],
};
