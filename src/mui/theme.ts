import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(198, 72, 126)",
    },
    secondary: {
      main: "#00a8ab",
      contrastText: "#ffffff",
      dark: "#0097a7",
    },
    error: {
      main: "#dc4046",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#363b40",
      secondary: "#7B848C",
    },
    warning: {
      main: "#f57c00",
    },
    success: {
      main: "#42d07d",
    },
    info: {
      main: "#dde6eb",
    },
  },
  shadows: [
    "none",
    "0px 5px 20px rgba(0, 0, 0, 0.1)",
    "0px 10px 30px rgba(0, 0, 0, 0.1)",
    "0px 15px 40px rgba(0, 0, 0, 0.15)",
    "0px 3px 5px rgba(0, 0, 0, 0.25)",
    "none",
    "none",
    "none",
    "0px 1px 10px rgba(0, 0, 0, 0.1)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "10px 15px 60px rgba(0, 0, 0, 0.2)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "10px 15px 60px rgba(0, 0, 0, 0.2)",
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
