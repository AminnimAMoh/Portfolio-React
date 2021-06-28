import React from 'react'
import MenuButton from './views/MenuButton'
import ContentContainer from './views/ContentContainer'
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { RootState } from './store';
import {rowGridToggleToReverce} from './redux/slices/ScreenSettingsSlice'
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
    [theme.breakpoints.down('md')]:{
      flexFlow: 'column',
    },
    '&.open':{
      paddingRight: theme.spacing(20),
      [theme.breakpoints.down('md')]:{
        paddingRight: theme.spacing(0),
      }
    },
    '&.close':{
      paddingRight: 0
    }
  }
}));

interface Props {

}

function App({ }: Props): React.ReactElement {
  console.clear();
  const dispatch=useDispatch();
  const {containerState: {rootState}}=useSelector((state: RootState)=>state.buttonAction)
  const classes = useStyle()
  if(window.innerWidth<1280){
    dispatch(rowGridToggleToReverce())
  }
  return (
    <div className={rootState ? `${classes.root} open` : `${classes.root} close`}>
      <MenuButton />
      <ContentContainer />
    </div>
  )
}

export default App

