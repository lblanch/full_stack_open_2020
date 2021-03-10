import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'

import { actionLoginFromStorage } from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import BlogList from './components/BlogList'
import { actionShowErrorNotification } from './reducers/notificationReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [blogs, setBlogs] = useState([])

    const blogFormRef = useRef()

    const sortedBlogs = blogs.sort((a, b) => Number(b.likes) > Number(a.likes))

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.getAll()
                setBlogs(response)
            } catch (exception) {
                //should be the same as calling "errorHandler"
                dispatch(actionShowErrorNotification(exception))
            }
        }
        fetchBlogs()
    }, [])

    useEffect(() => {
        dispatch(actionLoginFromStorage())
    }, [])

    const showMessage = (message) => {
        console.log('INFO!!!!!', message)
    }

    const errorHandler = (error) => {
        console.log('ERROR!!!!!!', error)
    }

    const createBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility()

        try {
            const response = await blogService.create(newBlog)
            setBlogs(blogs.concat(response))
            showMessage(`Blog "${newBlog.title}" by ${newBlog.author} has been added!`)
        } catch (exception) {
            errorHandler(exception)
        }
    }

    const likeBlog = async (blogId, likes) => {
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
    }

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
                        <BlogForm createBlog={createBlog} />
                    </Togglable>
                    <br />
                    <BlogList blogs={sortedBlogs} likeBlog={likeBlog} deleteBlog={deleteBlog} loggedUser={user.username} />
                </div>
            }
        </div>
    )
}

export default App