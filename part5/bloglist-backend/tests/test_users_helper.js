const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const initialUsers = [
    {
        username: 'root',
        name: 'Michael Chan',
        password: 'reactpatterns'
    }
]

const usersInDb = async () => {
    return await User.find({})
}

const nonExistingUserId = async () => {
    const user = new User({ username: 'tobedeleted', passwordHash: 'tobeeliminated' })
    await user.save()
    await user.remove()

    return user._id.toString()
}

const specificUserInDb = async (id) => {
    return await User.findById(id)
}

const reloadUsersDb = async () => {
    await User.deleteMany({})
    const saltRounds = 10
    let UserObject
    for (let user of initialUsers) {
        UserObject = new User(user)
        UserObject.passwordHash = await bcrypt.hash(user.password, saltRounds)
        await UserObject.save()
    }

    const userForToken = {
        username: UserObject.username,
        id: UserObject._id
    }

    return { token: jwt.sign(userForToken, process.env.SECRET), user: UserObject }
}

const loginUser = (user) => {
    const userForToken = {
        username: user.username,
        id: user._id
    }

    return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
    initialUsers,
    usersInDb,
    nonExistingUserId,
    specificUserInDb,
    reloadUsersDb,
    loginUser
}