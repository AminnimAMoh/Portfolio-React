import React, { useEffect, useState } from "react";

import MenuButton from "./views/MenuButton";
import ContentContainer from "./views/ContentContainer";
import DataFetchPending from "./views/DataFetchPending";
import useStyle from "./AppStyle";
import { Snackbar, Slide } from "@material-ui/core";

//Importing the redux store type.
import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { rowGridToggleToReverce } from "./redux/slices/ScreenSettingsSlice";
import {readDataAgain} from './redux/slices/fetchSlice'

function TransitionUp(props: any | undefined | null) {
  return <Slide {...props} direction="up" />;
}

function App(): React.ReactElement {
  // console.clear();
  const [svgSetupTrigger, setSVGSetupTrigger] = useState<boolean>(false);
  const [snackState, setSnackState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    buttonAction: { rootState, buttonTrigered },
    dataStore: { annualrain, slums, population, months },
  } = useSelector((state: RootState) => state);
  const classes = useStyle();
  useEffect(() => {
    if (window.innerWidth < 1280) {
      dispatch(rowGridToggleToReverce(window.innerWidth));
    }
  });

  useEffect(() => {
    annualrain.state === "fulfilled" &&
      slums.state === "fulfilled" &&
      population.state === "fulfilled" &&
      months.state === "fulfilled" &&
      setSVGSetupTrigger(true);

    //In the condition of any error from any of the API calls
    //their state will be set to 'rejected' (visit fetchSlice.tsx)->
    //Show the snack bar to recall the APIs relevant to the map.
    (annualrain.state === "rejected" ||
      slums.state === "rejected" ||
      population.state === "rejected" ||
      months.state === "rejected") &&
      setSnackState(true);
  }, [annualrain.state, slums.state, population.state, months.state]);

  const snackBarRefreshAction = () => {
    dispatch(readDataAgain())
    setSnackState(false);
  };

  return (
    <div
      className={rootState ? `${classes.root} open` : `${classes.root} close`}
    >
      {!svgSetupTrigger && buttonTrigered === "D3" && (
        <div className={classes.loading}>
          <DataFetchPending />
        </div>
      )}
      <Snackbar
        open={snackState}
        TransitionComponent={TransitionUp}
        message={`Data is not available. Click here to try again.`}
        onClick={snackBarRefreshAction}
        style={{cursor: 'pointer'}}
      />
      <MenuButton />
      <ContentContainer />
    </div>
  );
}

export default App;
