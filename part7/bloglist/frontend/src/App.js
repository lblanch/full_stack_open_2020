import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actionLoginFromStorage } from './reducers/userReducer'

import AppOut from './AppOut'
import AppIn from './AppIn'
import { Redirect, Switch, Route } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(actionLoginFromStorage())
    }, [])

    return (
        <div>
            <Switch>
                <Route path="/login">
                    { user === null
                        ? <AppOut />
                        : <Redirect to="/" />
                    }
                </Route>
                <Route>
                    { user === null
                        ? <Redirect to="/login" />
                        : <AppIn />
                    }
                </Route>
            </Switch>
        </div>
    )
}

export default App