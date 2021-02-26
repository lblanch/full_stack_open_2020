import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import BlogList from './components/BlogList'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const blogFormRef = useRef()

    const sortedBlogs = blogs.sort((a, b) => Number(b.likes) > Number(a.likes))

    //UseEffect cannot directly receive an async func. In future, suspense should be used
    //(suspense is an experimental feature still)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.getAll()
                setBlogs(response)
            } catch (exception) {
                //should be the same as calling "errorHandler"
                setNotificationType('error')
                setNotificationMessage(exception.message)
                setTimeout(() => setNotificationMessage(''), 5000)
            }
        }
        fetchBlogs()
    }, [])

    useEffect(() => {
        const user = window.localStorage.getItem('loggedBloglistUser')
        if (user) {
            blogService.setToken(JSON.parse(user).token)
            setUser(JSON.parse(user))
        }
    }, [])

    const showMessage = (message, type = 'info') => {
        setNotificationType(type)
        setNotificationMessage(message)
        setTimeout(() => setNotificationMessage(''), 5000)
    }

    const errorHandler = (error) => {
        if (error.response.data.error) {
            console.log('Error: ', error.response.data.error)
            showMessage(`Error: ${error.response.data.error}`, 'error')
        } else {
            console.log('Error: ', error.message)
            showMessage(`Error: ${error.message}`, 'error')
        }
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

    const handleLogin = async (credentials) => {
        try {
            const response = await loginService.login(credentials)
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
            blogService.setToken(response.token)
            setUser(response)
            showMessage(`User "${response.name}" has logged in!`)
        } catch (exception) {
            errorHandler(exception)
        }
    }

    const handleLogout = (event) => {
        window.localStorage.removeItem('loggedBloglistUser')
        blogService.setToken(null)
        showMessage(`User "${user.name}" has logged out!`)
        setUser(null)
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={notificationMessage} type={notificationType} />
            { user === null ?
                <LoginForm handleLogin={handleLogin} /> :
                <div>
                    <Logout handleLogout={handleLogout} name={user.name} />
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