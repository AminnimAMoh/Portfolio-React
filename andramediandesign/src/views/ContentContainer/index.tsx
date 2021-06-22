import React from 'react'
import useStyle from './style'
import {useSelector} from 'react-redux'
import { RootState } from 'src/store'
import UX from '../Pages/UX'

interface Props {
  
}

function ContentContainer({}: Props): React.ReactElement {
const classes=useStyle()
const buttonState: boolean=useSelector((state: RootState) =>state.buttonAction.containerState)
  return (
    <div 
    className={classes.root}
    style={buttonState ? {width: '100%'} : {}}
    >
      <UX/>
    </div>
  )
}

export default ContentContainer

