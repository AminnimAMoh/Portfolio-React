import { makeStyles } from "@material-ui/core/styles";

const mytheme = {
  radius: 82,
};

const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    "& >img": {
      width: "20%",
    },
  },
  powerButton:{
    cursor: 'pointer',
    zIndex: 2,
  },
  menuButtons: {
    position: "absolute",
  },
  buttonContainers:{
    position: 'absolute',
    transition: 'transform 1s ease-in-out'
  },
  iconButtons: {
    width: mytheme.radius,
    height: mytheme.radius,
    position: "relative",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    cursor: "pointer",
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-1px",
      right: 0,
      bottom: 0,
      left: "-1px",
      zIndex: -1,
      height: mytheme.radius + 2,
      width: mytheme.radius + 2,
      borderRadius: "inherit",
      background:
        "linear-gradient(155deg, rgba(122,145,147,1) 0%, rgba(6,22,33,1) 100%)",
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
      height: mytheme.radius,
      width: mytheme.radius,
      borderRadius: "inherit",
      background: "rgba(0,0,0,.5)",
      filter: "blur(16px)",
    },
  },
}));

export default useStyle;
