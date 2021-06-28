import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: '20%',
    zIndex: 1,
    transition: "transform 1s ease-in",
    "& >img": {
      width: "100%",
      minWidth: '30%'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '20%',
      paddingTop: theme.spacing(15),
      "& >img": {
        width: "20%",
        minWidth: '20%'
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7)
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
      '&>img': {
        // width: "40%",
        minWidth: '25%'
      }
    },
  },
  powerButton: {
    cursor: "pointer",
    zIndex: 2,
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
        transform: "rotate(180deg)",
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
      top: "-1px",
      right: 0,
      bottom: 0,
      left: "-1px",
      zIndex: -1,
      borderRadius: "inherit",
      background:
        "linear-gradient(155deg, rgba(122,145,147,1) 0%, rgba(6,22,33,1) 100%)",
      transition: "transform .5s ease-in",
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
    '&.focused': {
      '&::before': {
        transform: "scale(1.2)",
        filter: "blur(12px)",
        background: "rgba(18,57,61,1)",
      }
    }
  },
}));

export default useStyle;
