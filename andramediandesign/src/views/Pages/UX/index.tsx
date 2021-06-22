import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: theme.spacing(0,20)
  }
}));

interface Props {

}

function UX({ }: Props): React.ReactElement {
  console.clear();
  const classes = useStyle()
  return (
    <div>
        <h1 className={classes.root} style={{color: 'white'}}>Hello from UI Component</h1>
    </div>
  )
}

export default UX

