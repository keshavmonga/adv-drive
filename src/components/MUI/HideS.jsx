import React from 'react'
import { Hidden } from '@mui/material'

const HideS = ({children}) => {
    return (
        <Hidden smDown implementation="css">
            {children}
        </Hidden>
    )
}

export default HideS
