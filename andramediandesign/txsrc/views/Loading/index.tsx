import React from 'react'
import {Backdrop, CircularProgress} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      backgroundColor: 'rgba(255,255,255,.2) !important',
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

function Loading(): React.ReactElement {
    const classes = useStyles();
    const open=true;
  
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

export default Loading
