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
});

export default theme;
