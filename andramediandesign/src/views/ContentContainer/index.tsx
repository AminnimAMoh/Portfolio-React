import React from 'react'
import useStyle from './style'
import {useSelector} from 'react-redux'
import { RootState } from 'src/store'
import UX from '../Pages/UX'

interface Props {
  state: string | null
}

const RenderObject({state}: Props): React.ReactElement{
  switch(state){
    case '':
      break;
      default: return <UX/>
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
    className={classes.root}
    style={buttonState ? {width: '100%'} : {}}
    >
      <RenderObject state={renderObject} />
    </div>
  )
}

export default ContentContainer

