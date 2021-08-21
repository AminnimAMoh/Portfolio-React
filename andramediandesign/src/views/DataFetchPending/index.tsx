import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';

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
});

interface Props {
}

function DataPending({  }: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress 
      variant='indeterminate'
      classes={{
        query: classes.barRoot,
        bar: classes.bar, 
        }}
      />
    </div>
  );
}

export default DataPending;
