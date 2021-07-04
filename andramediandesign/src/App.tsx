import React, { useEffect } from "react";

import MenuButton from "./views/MenuButton";
import ContentContainer from "./views/ContentContainer";
import InfoFlout from './views/InfoFlout'

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { RootState } from "./store";
import { rowGridToggleToReverce } from "./redux/slices/ScreenSettingsSlice";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexFlow: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexFlow: "column",
    },
    "&.open": {
      paddingRight: theme.spacing(20),
      [theme.breakpoints.down("md")]: {
        paddingRight: theme.spacing(0),
      },
    },
    "&.close": {
      paddingRight: 0,
    },
  },
  landinginfo: {
    position: "absolute",
  },
}));

function App(): React.ReactElement {
  // console.clear();
  const dispatch = useDispatch();
  const {
    buttonAction: { rootState },
  } = useSelector((state: RootState) => state);
  const classes = useStyle();
  useEffect(() => {
    if (window.innerWidth < 1280) {
      dispatch(rowGridToggleToReverce(window.innerWidth));
    }
  });
  return (
    <div
      className={rootState ? `${classes.root} open` : `${classes.root} close`}
    >
      <InfoFlout/>
      <MenuButton />
      <ContentContainer />
    </div>
  );
}

export default App;
