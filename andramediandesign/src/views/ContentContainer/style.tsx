import { makeStyles } from "@material-ui/core/styles";

const mytheme = {
  radius: 80,
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    opacity: 1,
    transform: "translateX(-150%)",
    transition:
      "transform 1s ease-in-out .5s, width .5s ease, height .5s ease, padding .5s ease, opacity .5s ease .5s",
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
      backgroundImage: "none",
      padding: theme.spacing(0, 6, 12),
    },
    "&.open": {
      transform: "translateX(0%)",
    },
    "&.open_vertically": {
      transform: "translateY(0%)",
    },
    "&.close_vertically": {
      transform: "translate(0%, 100%)",
      padding: 0,
      opacity: 0,
    },
    "&.close": {
      padding: 0,
      opacity: 0,
    },
  },
  MobileFrame: {
    display: "none",
    position: "sticky",
    height: "auto",
    top: "-5px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  scrollToTop: {
    position: "sticky",
    top: "100%",
    right: "0%",
    transform: "translateY(-15px) scale(0)",
    width: mytheme.radius,
    height: mytheme.radius,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform .5s ease-in-out",
    [theme.breakpoints.down('md')]:{
      transform: "translateY(-35px) scale(0)",
    },
    "& >div": {
      width: '100%',
      height: '100%',
      backgroundImage: "url(images/Button/ScrollToTop/Top.png)",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      zIndex: 1,
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#12393D",
        opacity: .8,
        borderRadius: "50%",
        width: mytheme.radius,
        height: mytheme.radius,
        filter: 'blur(15px)',
        zIndex: -2,
        transition: 'transform .5s ease-in-out, background-color 1s ease-in'
      },
      '&::after':{
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '-1%', 
        bottom: 0, 
        left: 0, 
        right: '-1%',
        width: '102%',
        height: '102%',
        background: 'linear-gradient(163deg, rgba(156,60,65,1) 0%, rgba(18,57,61,1) 100%)',
        borderRadius: '50%',
        zIndex: -1,
        transition: 'transform .5s ease-in-out .5s',
        '-webkit-transition' : '-webkit-filter 500ms linear, -webkit-transform .5s ease-in-out .5s'
      }
    },
    '&:hover, &:focus':{
      '&>div::before':{
        transform: 'scale(1.5)',
        backgroundColor: "#9C3C41",
      },
      '&>div::after':{
        transform: 'scale(1.1)',
        filter: 'blur(1.5px)',
      }
    }
  },
}));

export default useStyle;
