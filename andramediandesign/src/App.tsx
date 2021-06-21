import React from 'react'
import MenuButton from './views/MenuButton'
import ContentContainer from './views/ContentContainer'
import { makeStyles } from "@material-ui/core/styles";

// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

interface Props {

}

function App({ }: Props): React.ReactElement {
  console.clear();
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <MenuButton />
      <ContentContainer />
    </div>
  )
}

export default App

