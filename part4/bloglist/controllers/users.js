const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    if (!request.body.password) {
        return response.status(400).send({ error: 'missing password' })
    } else if (request.body.password.length < 3) {
        return response.status(400).send({ error: 'password must have at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const newUser = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash: passwordHash
    })

    const savedUser = await newUser.save()
    response.json(savedUser)
})

module.exports = usersRouter