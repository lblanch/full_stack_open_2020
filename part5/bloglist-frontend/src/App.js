import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        ).catch((error) => errorHandler(error))
    }, [])

    useEffect(() => {
        const user = window.localStorage.getItem('loggedBloglistUser')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])

    const errorHandler = (error) => {
        if (error.response) {
            console.log('Error: ', error.response.data.error)
        } else {
            console.log('Error: ', error.message)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
            setUser(response)
            setUsername('')
            setPassword('')
        } catch (exception) {
            errorHandler(exception)
        }
    }

    const handleLogout = (event) => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
    }

    return (
        user === null ?
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
            <input 
                type="text" value={username} name="Username" placeholder="username"
                onChange={({ target }) => setUsername(target.value)}
            />
            <br />
            <input type="password" value={password} name="Password" placeholder="password"
                onChange={({ target }) => setPassword(target.value)}
            />
            <button type="submit">login</button>
        </form>
        </div> :
        <div>
            <h2>blogs</h2>
            <div>{user.name} is logged in <button type="button" onClick={handleLogout}>logout</button></div>
            <br />
            <div>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</div>
        </div>
    )
}

export default App