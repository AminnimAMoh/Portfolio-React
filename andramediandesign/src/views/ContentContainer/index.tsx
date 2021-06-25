import React from 'react'
import useStyle from './style'
import {useSelector} from 'react-redux'
import { RootState } from 'src/store'
import UX from '../Pages/UX'

interface Props {

}

function RenderObject(state: any): React.ReactElement {
  console.log(state);
  
  switch(state.state){
    case 'UX':
      return <UX/>
      break;
      default: 
      return  <h1>{state.state}</h1>
      break;
  }
  return <div></div>
}

function ContentContainer({}: Props): React.ReactElement {
const classes=useStyle()
const {containerState: {rootState, delayState}, renderPage }=useSelector((state: RootState) =>state.buttonAction)

  return (
    <div 
    className={rootState ? `${classes.root} open` :  `${classes.root} close` }
    style={rootState && !delayState ? {transform: 'translateX(0%)'} : !rootState && delayState ? {width: '0', padding: 0, opacity: 0} : {}}
    >
      <RenderObject state={renderPage} />
    </div>
  )
}

export default ContentContainer

