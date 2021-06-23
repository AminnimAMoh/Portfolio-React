import { makeStyles } from "@material-ui/core/styles";

// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
root:{
    width: '0',
    height: '100%',
    backgroundImage:'url(images/Containers/Content_Frame/Page-Frame-Light-Shadow.png)',
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: 'width 1s ease-in-out',
    padding: theme.spacing(12,6),
    overflowY: 'auto'
}
}));

export default useStyle