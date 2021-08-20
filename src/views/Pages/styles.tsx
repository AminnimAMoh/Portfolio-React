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
    color: "white",
    '& > .MuiGrid-item img': {
      width: '100%'
    },
    '&>*': {
      padding: theme.spacing(4)
    },
    '&>*:nth-child(n+4)': {
      paddingTop: theme.spacing(20)
    },
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
  inner_GridContainer: {
    '& > *': {
      paddingTop: theme.spacing(10)
    }
  },
  topic_pragraph: {},
  video_container:{
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: -1,
  },
  video_root: {
    width: '100%',
    position: 'relative',
  },
  video_responsive: {
    overflow: 'hidden',
    /* 16:9*/
    position: 'relative',
    width: '100%',
  },
  divider:{
    backgroundColor: 'white !important'
  }
}));

export default useStyle;
