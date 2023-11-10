import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      primary: "rgb(198, 72, 126)",
      secondary: "#F5F5F5",
      orange: "rgb(210, 131, 84)",
      gray: {
        100: "#fcfcfd",
        200: "#f1f5f7",
        300: "#dde6eb",
        400: "#B3BEC5",
        500: "#7b848c",
        600: "#363b40",
      },
      pink: "#ffc0cb",
    },
  },
  plugins: [],
} satisfies Config;
