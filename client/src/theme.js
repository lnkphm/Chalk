import { red } from "@material-ui/core/colors/";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: '#dc004e',
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
