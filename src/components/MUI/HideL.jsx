import React from 'react'
import { Hidden } from '@mui/material'

const HideL = ({children}) => {
    return (
        <Hidden smUp implementation="css">
            {children}
        </Hidden>
    )
}

export default HideL
