import { amber } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: amber.A400,
      light: amber[200],
      dark: amber[700],
    },
    type: "dark",
  },
  spacing: {
    unit: 10,
  },
  props: {
    MuiWithWidth: {
      initialWidth: "lg",
    },
  },
});
