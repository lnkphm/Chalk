import { red } from "@material-ui/core/colors/";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFF",
    },
    secondary: {
      main: "#1967D2",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFF",
    },
  },
});

export default theme;
