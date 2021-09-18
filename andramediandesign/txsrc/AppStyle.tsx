import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexFlow: "row-reverse",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexFlow: "column",
      },
      "&.open": {
        paddingRight: theme.spacing(20),
        [theme.breakpoints.down("md")]: {
          paddingRight: theme.spacing(0),
        },
      },
      "&.close": {
        paddingRight: 0,
      },
    },
    landinginfo: {
      position: "absolute",
    },
    Splash: {
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: theme.spacing(6),
      color: "white",
    },
    loading: {
      width: "100%",
      position: "absolute",
      top: 0,
      zIndex: 1,
    },
    snackbar:{
      cursor: 'pointer',
      // background: 'red',
      '& >*':{
        background: '#9c3c41',
      }
    }
  }));

  export default useStyle