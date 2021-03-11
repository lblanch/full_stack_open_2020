import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
    <tr>
        <td><Link to={`/users/${user.id}`}> {user.name}</Link></td>
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