import { makeStyles } from "@material-ui/core/styles";

// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
root:{
    width: '100%',
    height: '100%',
    backgroundImage:'url(images/Containers/Content_Frame/Page-Frame-shadow.png)',
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
}
}));

export default useStyle