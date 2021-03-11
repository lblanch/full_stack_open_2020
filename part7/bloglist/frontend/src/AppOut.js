import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const AppOut = () => {
    return (
        <div>
            <Switch>
                <Route path="/login">
                    <h1>blog app</h1>
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