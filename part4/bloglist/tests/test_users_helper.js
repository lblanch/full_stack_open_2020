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

    let UserObject
    for (let user of initialUsers) {
        UserObject = new User(user)
        await UserObject.save()
    }
}

module.exports = { initialUsers, usersInDb, nonExistingUserId, specificUserInDb, reloadUsersDb }