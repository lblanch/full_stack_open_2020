import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (event) => {
        event.preventDefault()

        const credentials = { username, password }
        setUsername('')
        setPassword('')
        await handleLogin(credentials)
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={loginUser}>
                <input
                    type="text" value={username} name="Username" placeholder="username"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <input type="password" value={password} name="Password" placeholder="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
