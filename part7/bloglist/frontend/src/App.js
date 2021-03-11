import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'

import { actionLoginFromStorage } from './reducers/userReducer'
import { actionInitBlogs } from './reducers/blogReducer'
import { actionInitUsers } from './reducers/usersReducer'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(actionLoginFromStorage())
        dispatch(actionInitBlogs())
        dispatch(actionInitUsers())
    }, [])

    return (
        <div>
            <div>
                <Link style={{ padding: 5 }} to ="/">home</Link>
                <Link style={{ padding: 5 }} to ="/users">users</Link>
            </div>
            <h1>blogs</h1>
            <Notification />
            { user === null
                ? <LoginForm />
                :
                <div>
                    <Logout />
                    <br />
                    <Switch>
                        <Route path="/users">
                            <UserList />
                        </Route>
                        <Route path="/">
                            <Togglable showLabel="new note" hideLabel="cancel" ref={blogFormRef}>
                                <BlogForm parentRef={blogFormRef} />
                            </Togglable>
                            <br />
                            <BlogList />
                        </Route>
                    </Switch>
                </div>
            }
        </div>
    )
}

export default App