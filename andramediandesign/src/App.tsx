import React from 'react'
import MenuButton from './views/MenuButton'
import ContentContainer from './views/ContentContainer'
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { RootState } from './store';
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
    '&.open':{
      paddingRight: theme.spacing(20),
    },
    '&.close':{
      paddingRight: 0
    }
  }
}));

interface Props {

}

function App({ }: Props): React.ReactElement {
  // console.clear();
  const {containerState: {rootState}}=useSelector((state: RootState)=>state.buttonAction)
  const classes = useStyle()
  return (
    <div className={rootState ? `${classes.root} open` : `${classes.root} close`}>
      <MenuButton />
      <ContentContainer />
    </div>
  )
}

export default App

