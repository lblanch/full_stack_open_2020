import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actionLoginFromStorage } from './reducers/userReducer'
import { actionInitBlogs } from './reducers/blogReducer'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import BlogList from './components/BlogList'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const state = useSelector(state => state)
    console.log(state)

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(actionInitBlogs())
    }, [])

    useEffect(() => {
        dispatch(actionLoginFromStorage())
    }, [])

    /*const createBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility()
    }*/

    /*const likeBlog = async (blogId, likes) => {
        try {
            const updatedBlog = await blogService.update(blogId, { likes })
            setBlogs(blogs.filter(b => b.id !== blogId).concat(updatedBlog))
        } catch (exception) {
            errorHandler(exception)
        }
    }

    const deleteBlog = async (blogId) => {
        try {
            await blogService.deleteBlog(blogId)
            setBlogs(blogs.filter(b => b.id !== blogId))
        } catch (exception) {
            errorHandler(exception)
        }
    }*/

    return (
        <div>
            <h1>blogs</h1>
            <Notification />
            { user === null
                ? <LoginForm />
                :
                <div>
                    <Logout />
                    <br />
                    <Togglable showLabel="new note" hideLabel="cancel" ref={blogFormRef}>
                        <BlogForm />
                    </Togglable>
                    <br />
                    <BlogList />
                </div>
            }
        </div>
    )
}

export default App