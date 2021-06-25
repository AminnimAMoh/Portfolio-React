import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 1s ease-in",
    marginLeft: 0,
    marginRight: "auto",
    direction: "ltr",
  },
  topic_grid: {
    transform: "translateX(-100%)",
    display: 'none',
    transition: "transform 1s ease-in-out .5s",
    // maxWidth:'50%',
    color: "white",
  },
  topick_heading: {
    color: "white",
    "& >*:not(:first-child)": {
      paddingTop: "8px",
    },
  },
  onlineLink: {},
  link_ToExternals: {
    color: "#5C3B42",
  },
  topic_pragraph: {},
}));

export default useStyle;
