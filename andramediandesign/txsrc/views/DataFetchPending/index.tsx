import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';
import { RootState } from "../../store";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  barRoot:{
    backgroundColor: '#061621'
  },
  bar:{
      backgroundColor: '#12393d'
  },
  barError:{
    backgroundColor: '#9c3c41'
  }
});


function DataPending(): React.ReactElement {
  const classes = useStyles();
  const {dataStore: { errorState }}=useSelector((state: RootState)=> state)
  return (
    <div className={classes.root}>
      <LinearProgress 
      variant='indeterminate'
      classes={!errorState ? {
        query: classes.barRoot,
        bar: classes.bar, 
        } : {
          query: classes.barRoot,
          bar: classes.barError, 
          }}
      />
    </div>
  );
}

export default DataPending;
