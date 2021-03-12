import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, IconButton, Box } from '@material-ui/core'

import Logout from './Logout'

const NavigationBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Button color="inherit" component={Link} to ="/">
                    Home
                </Button>
                <Box display='flex' flexGrow={1}>
                    <Button color="inherit" component={Link} to ="/users">
                        Users
                    </Button>
                </Box>
                <Logout />
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar