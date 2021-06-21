import React from 'react'
import useStyle from './style'

interface Props {
  
}

function ContentContainer({}: Props): React.ReactElement {
const classes=useStyle()
  return (
    <div className={classes.root}>

    </div>
  )
}

export default ContentContainer

