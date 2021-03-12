import { Typography } from '@material-ui/core'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'


import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const AppOut = () => {
    return (
        <div>
            <Switch>
                <Route path="/login">
                    <Typography variant="h1" component="h2" gutterBottom>
                        Blog App
                    </Typography>
                    <Notification />
                    <LoginForm />
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </div>
    )
}

export default AppOut