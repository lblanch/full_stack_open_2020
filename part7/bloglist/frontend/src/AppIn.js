import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import { actionInitBlogs } from './reducers/blogReducer'
import { actionInitUsers } from './reducers/usersReducer'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'

const AppIn = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = useRef()

    const userMatch = useRouteMatch('/users/:id')
    const userParam = userMatch
        ? users.find(u => u.id.toString() === userMatch.params.id)
        : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const blogParam = blogMatch
        ? blogs.find(b => b.id.toString() === blogMatch.params.id)
        : null

    useEffect(() => {
        dispatch(actionInitBlogs())
    }, [])

    useEffect(() => {
        dispatch(actionInitUsers())
    }, [blogs.length])

    return (
        <div>
            <div>
                <Link style={{ padding: 5 }} to ="/">home</Link>
                <Link style={{ padding: 5 }} to ="/users">users</Link>
            </div>
            <h1>blogs</h1>
            <Notification />
            <div>
                <Logout />
                <br />
                <Switch>
                    <Route path="/login">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/blogs/:id">
                        <Blog blog={blogParam} />
                    </Route>
                    <Route path="/users/:id">
                        <User user={userParam} />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/">
                        <Togglable showLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
                            <BlogForm parentRef={blogFormRef} />
                        </Togglable>
                        <br />
                        <BlogList />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default AppIn