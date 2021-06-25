import { makeStyles } from "@material-ui/core/styles";

// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
  root: {
    width: "0%",
    height: "100%",
    transform: "translateX(-150%)",
    transition: "transform 1s ease-in-out, width .5s ease .2s",
    overflowX: "hidden",
    overflowY: "auto",
    direction: "rtl",
    backgroundImage:
      "url(images/Containers/Content_Frame/Page-Frame-Light-Wave.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "right",
    padding: theme.spacing(12, 41, 0, 6),
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(12, 40, 0, 6),
    },
    "&.close": {
      animation: "displayOff .5s linear 2s 1 alternate",
    },
    "&.open": {
      animation: "displayOn .5s linear 2s 1 alternate",
    },
  },
  "@keyframes displayOff": {
    "0%": {
      display: "block",
    },
    "100%": {
      display: "none",
    },
  },
  "@keyframes displayOn": {
    "0%": {
      display: "none",
    },
    "100%": {
      display: "block",
    },
  },
}));

export default useStyle;
