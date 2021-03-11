import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => (
    <tr>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.blogs.length}</td>
    </tr>
)

const UserList = () => {
    const users = useSelector(state => state.users)
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Blogs created</th>
                </tr>
            </thead>
            <tbody>
                { users.map(user => <User key={user.id} user={user} />) }
            </tbody>
        </table>
    )
}

export default UserList