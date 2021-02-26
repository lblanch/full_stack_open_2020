const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const user = await User.findOne({ username: request.body.username })
    const isPasswordCorrect = (user === null) || !request.body.password ?
        false :
        await bcrypt.compare(request.body.password, user.passwordHash)

    if (!(user && isPasswordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter