import React from "react";
// import { useSelector } from "react-redux";
import useStyles from "./styles";
// import { RootState } from "../../store";

interface Props {}



function Info({}: Props): React.ReactElement {
//   const {
//     buttonAction: { data },
//   } = useSelector((state: RootState) => state);
  const classes = useStyles();

  
  return (
    <div
      className={classes.root}
    >

    </div>
  );
}

export default Info;
