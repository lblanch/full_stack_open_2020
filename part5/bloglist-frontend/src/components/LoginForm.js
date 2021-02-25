import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsername, handlePassword }) => (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
            <input 
                type="text" value={username} name="Username" placeholder="username"
                onChange={handleUsername}
            />
            <br />
            <input type="password" value={password} name="Password" placeholder="password"
                onChange={handlePassword}
            />
            <button type="submit">login</button>
        </form>
    </div>
)

export default LoginForm
