import React, { useEffect, useState } from "react";

import MenuButton from "./views/MenuButton";
import ContentContainer from "./views/ContentContainer";
import DataFetchPending from "./views/DataFetchPending";

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
  Splash: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: theme.spacing(6),
    color: "white",
  },
  loading:{
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  }
}));

function App(): React.ReactElement {
  // console.clear();
  const [dataStates, setDataStates] = useState<Array<String>>([]);
  const [svgSetupTrigger, setSVGSetupTrigger] = useState<boolean>(false);
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
    setDataStates([
      annualrain.state,
      slums.state,
      population.state,
      months.state,
    ]);
    (dataStates[0] === "fulfilled" &&
      dataStates[1] === "fulfilled" &&
      dataStates[2] === "fulfilled" &&
      dataStates[3] === "fulfilled") &&
      setSVGSetupTrigger(true);
  }, [annualrain.state, slums.state, population.state, months.state]);
    console.log(dataStates);
    
  return (
    <div
      className={rootState ? `${classes.root} open` : `${classes.root} close`}
    >
      {(!svgSetupTrigger && buttonTrigered==='D3') &&
        <div className={classes.loading}> 
        <DataFetchPending />
        </div>
        }
      <MenuButton />
      <ContentContainer />
    </div>
  );
}

export default App;
