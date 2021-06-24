import { makeStyles } from "@material-ui/core/styles";

// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
root:{
    width: '0',
    height: '100%',
    opacity: 0,
    backgroundImage:'url(images/Containers/Content_Frame/Page-Frame-Light-Shadow.png)',
    backgroundSize: "cover",
    backgroundPositionX: "right",
    backgroundRepeat: "no-repeat",
    transitionProperty: 'width, opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    overflowX:'hidden',
    padding: theme.spacing(12,6),
    overflowY: 'auto',
    direction: 'rtl',
    minWidth: '900px'
}
}));

export default useStyle