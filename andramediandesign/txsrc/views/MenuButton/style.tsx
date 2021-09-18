import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "20%",
    zIndex: 1,
    transition: "transform 1s ease-in",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "20%",
      paddingTop: theme.spacing(15),
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(7),
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(1),
    },
  },
  powerButton: {
    cursor: "pointer",
    zIndex: 2,
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "18%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "25%",
    },
    "&>img": {
      width: "100%",
      // minWidth: "30%",
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      top: "10%",
      bottom: 0,
      left: "10%",
      right: 0,
      width: "80%",
      height: "80%",
      borderRadius: "50%",
      opacity: 1,
      filter: "blur(10px)",
      transition:
        "background-color 1s cubic-bezier(0, 1.51, 0.12, -0.29), -webkit-filter 2000ms cubic-bezier(0, 1.51, 0.12, -0.29)",
    },
    "&.open": {
      "&::before": {
        filter: "blur(15px)",
        transform: "scale(1.05)",
        backgroundColor: "#12393D",
      },
    },
    "&.close": {
      "&::before": {
        filter: "blur(5px)",
        backgroundColor: "#E4E5E7",
      },
    },
  },
  menuButtons: {
    position: "absolute",
  },
  buttonContainers: {
    position: "absolute",
    transition: "transform 1s ease-in-out",
  },
  iconButtons: {
    position: "relative",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover, &:focus": {
      "&::after": {
        transform: "rotate(180deg) scale(1.1)",
        filter: "blur(3px)",
      },
      "&::before": {
        transform: "scale(1.2)",
        background: "rgba(18,57,61,.2)",
      },
    },
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "0",
      right: 0,
      bottom: 0,
      left: "0",
      zIndex: -1,
      borderRadius: "inherit",
      width: "100%",
      height: "100%",
      transform: "scale(1.05)",
      background:
        "linear-gradient(155deg, rgba(122,145,147,1) 0%, rgba(6,22,33,1) 100%)",
      transition: "transform .5s ease-in, filter 500ms linear",
      "-webkit-transition":
        "-webkit-filter 500ms linear, -webkit-transform .5s ease-in",
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-1px",
      right: 0,
      bottom: 0,
      left: "-1px",
      zIndex: -2,
      borderRadius: "inherit",
      background: "rgba(0,0,0,.5)",
      filter: "blur(12px)",
      transition: "transform .2s ease-in-out",
    },
    "&.focused": {
      "&::before": {
        transform: "scale(1.2)",
        filter: "blur(12px)",
        background: "rgba(18,57,61,1)",
      },
    },
  },
  textOnPath: {
    position: "absolute",
    "&>path": {
      transform: "translate(-693.7247px, -269.9313px)",
      // fill: 'transparent',
    },
    "&>text": {
      fill: "white",
    },
  },
  introTexts_container: {
    position: "absolute",
    width: "max-content",
    transform: "translate(0, -50%)",
    top: "50%",
    left: "100%",
    paddingLeft: theme.spacing(2),
    zIndex: -3,
  },
  introTexts_text: {
    position: "relative",
    zIndex: 0,
    display: 'block',
    color: '#e4e5e7',
    padding: theme.spacing(1, 1, 1, 2),
    "&::before": {
      content: '""',
      display: "block",
      // backgroundColor: "#e4e5e7",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "-40%",
      right: 0,
      zIndex: -3,
      borderRadius: '6px'
    },
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#061621",
      position: "absolute",
      transform: "scale(1.1)",
      top: 0,
      bottom: 0,
      left: "-30%",
      right: 0,
      zIndex: 1,
      transition: 'width 1s ease-in-out 1.1s, transform 1s ease-in-out'
    },
    "&.open": {
      "&::after": {
        width: 0,
        transform: 'translateX(100%) scale(1.1)',
      },
    },
    "&.close": {
      "&::after": {
        width: '130%',
        transform: 'translateX(0) scale(1.1)'
      },
    },
  },
}));

export default useStyle;
