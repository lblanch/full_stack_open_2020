import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const blogFormRef = useRef()

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

    const handleChange = (value, changeFunction) => changeFunction(value)

    const createBlog = async (event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()
        
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        try {
            const response = await blogService.create(newBlog)
            setBlogs(blogs.concat(response))
            setTitle('')
            setAuthor('')
            setUrl('')
            showMessage(`Blog "${newBlog.title}" by ${newBlog.author} has been added!`)
        } catch (exception) {
            errorHandler(exception)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
            blogService.setToken(response.token)
            setUser(response)
            setUsername('')
            setPassword('')
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
                <LoginForm handleLogin={handleLogin} 
                    username={username}
                    password={password}
                    handlePassword={(event) => handleChange(event.target.value, setPassword)}
                    handleUsername={(event) => handleChange(event.target.value, setUsername)}
                /> :
                <div>
                    <div>{user.name} is logged in <button type="button" onClick={handleLogout}>logout</button></div>
                    <br />
                    <Togglable showLabel="new note" hideLabel="cancel" ref={blogFormRef}>
                        <BlogForm createBlog={createBlog}
                            title={title} handleTitle={(event) => handleChange(event.target.value, setTitle)}
                            author={author} handleAuthor={(event) => handleChange(event.target.value, setAuthor)}
                            url={url} handleUrl={(event) => handleChange(event.target.value, setUrl)}
                        />
                    </Togglable>
                    <br />
                    <h2>blog list</h2>
                    <div>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</div>
                </div>
            }
        </div>
    )
}

export default App