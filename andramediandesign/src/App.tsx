//This is the 'majula'. Dark Souls fans are familiar with this place. 😅
//Here we managing the main states.

import React, { useEffect, useState, Suspense, lazy } from "react";

// import MenuButton from "./views/MenuButton";
// import ContentContainer from "./views/ContentContainer";
// import DataFetchPending from "./views/DataFetchPending";
import useStyle from "./AppStyle";
import { Snackbar, Slide } from "@material-ui/core";

//Importing the redux store type.
import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { rowGridToggleToReverce } from "./redux/slices/ScreenSettingsSlice";
import { readDataAgain } from "./redux/slices/fetchSlice";

const MenuButton = lazy(() => import("./views/MenuButton"));
const ContentContainer = lazy(() => import("./views/ContentContainer"));
const DataFetchPending = lazy(() => import("./views/DataFetchPending"));

//An easy way to apply transitions to Material-UI components.
//Pre writen transition from Material-UI.
//I could write it my self, just to show off some gadgeta. 😉
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
    //RootState is the type of Redux ToolKit for store.
    //Addresses the type for reducers, middlewares, etc.
  } = useSelector((state: RootState) => state);
  const classes = useStyle();

  //This hook listens to the size changes on the browser window.
  //The page layout will be changed on small screens.
  //More specifically this hook will toggle the flex-flow on elements listening to 'screenState'.
  //Set up at 'ScreenSettingsSlice.tsx'->
  useEffect(() => {
    if (window.innerWidth < 1280) {
      //Sending the window width size as an argument to be checked in the reducer.
      dispatch(rowGridToggleToReverce(window.innerWidth));
    }
  });

  useEffect(() => {
    //Chacking if all data is fetched without error from APIs.
    //If there is a problem with any of the APIs application must stop.
    //Prompt the user to trigger the fetch action for the API call with an error.
    //This condition controls the visibility of the loading component at the top of the
    //screen in Map section.
    //Untile the 'svgSetupTrigger' state is false the component will be visible.
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

  //This function controles click action on the snack bar.
  const snackBarRefreshAction = () => {
    //First we set the 'refresh state of the 'fetchSlice' action to trigger the fetch
    //action on the asyncThunk function with state 'rejected'.
    //In this case only the rejected API will be called, not the rest. 🤯
    //More detail at 'fetchSlice.tsx'.
    dispatch(readDataAgain());
    //Close the snack bar.
    setSnackState(false);
  };

  return (
    <div
      className={rootState ? `${classes.root} open` : `${classes.root} close`}
    >
      <Suspense fallback={'Loading...'}>
        {!svgSetupTrigger && buttonTrigered === "D3" && (
          <div className={classes.loading}>
            <DataFetchPending />
          </div>
        )}
        <Snackbar
          open={snackState}
          TransitionComponent={TransitionUp}
          message={`Failed to fetch data. Click here to try again.`}
          onClick={snackBarRefreshAction}
          classes={{ root: classes.snackbar }}
        />
        <MenuButton />
        <ContentContainer />
      </Suspense>
    </div>
  );
}

export default App;
