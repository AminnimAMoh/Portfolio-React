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
const buttonState: boolean=useSelector((state: RootState) =>state.buttonAction.containerState)
const renderObject: string=useSelector((state: RootState) =>state.buttonAction.renderPage)
  return (
    <div 
    className={buttonState ? `${classes.root} open` :  `${classes.root} close` }
    style={buttonState ? {transform: 'translateX(0%)', width: '100%'} : {}}
    >
      <RenderObject state={renderObject} />
    </div>
  )
}

export default ContentContainer

