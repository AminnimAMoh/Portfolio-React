import { makeStyles } from "@material-ui/core/styles";

// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    opacity: 1,
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
    padding: theme.spacing(12, 41, 12, 6),
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(12, 40, 0, 6),
    },
    [theme.breakpoints.down("md")]: {
      backgroundImage: 'none',
      padding: theme.spacing(0,6,6),
    },
  },
  MobileFrame:{
    display: 'none',
    position: 'sticky',
    height: 'auto',
    top: '-5px',
    width: '100%',
    [theme.breakpoints.down('md')]:{
      display: 'block'
    }
  }
}));

export default useStyle;
