import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMuiTheme, Container, ThemeProvider } from '@material-ui/core'

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

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#66bb6a',
            },
            secondary: {
                main: '#e57373',
            },
        },
    })

    return (
        <Container>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </Container>
    )
}

export default App