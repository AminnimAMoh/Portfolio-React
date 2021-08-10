import { Typography } from '@material-ui/core'
import React from 'react'
import useStyle from '../styles'

interface Props {
    
}

function Undeveloped({}: Props): React.ReactElement {
    const classes=useStyle();
    return (
        <div>
            <Typography variant='h3' className={classes.topick_heading}>
                This page is temporary unavailable.
            </Typography>
        </div>
    )
}

export default Undeveloped
