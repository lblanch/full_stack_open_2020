import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import { actionLogout } from '../reducers/userReducer'

const Logout = () => {
    const dispatch = useDispatch()
    const name = useSelector(state => state.user.name)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleLogout = () => {
        dispatch(actionLogout())
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton aria-label="current user" aria-controls="menu-appbar" aria-haspopup="true"
                onClick={handleMenu} color="inherit">
                <AccountCircle />
                <Typography variant="button">
                    {name}
                </Typography>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default Logout