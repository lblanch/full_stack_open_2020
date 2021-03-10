import React from 'react'

import { actionLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()
    const loginUser = (event) => {
        event.preventDefault()

        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        event.target.username.value = ''
        event.target.password.value = ''

        dispatch(actionLogin(credentials))
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="username" />
                <br />
                <input type="password"  name="password" placeholder="password" />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
