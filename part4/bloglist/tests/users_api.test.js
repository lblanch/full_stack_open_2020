const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const helper = require('./test_users_helper')

const api = supertest(app)

beforeEach(async () => {
    await helper.reloadUsersDb()
})

afterAll (() => {
    mongoose.connection.close()
})

describe('POST users', () => {
    test('valid user is created correctly', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'not_root',
            name: 'Not Root',
            password: '1234567890'
        }

        const createdUser = await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(createdUser.body.username).toEqual(newUser.username)
        expect(createdUser.body.name).toEqual(newUser.name)
        expect(usersAtEnd.length).toEqual(usersAtStart.length + 1)
    })

    test('duplicated username returns status 400', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: helper.initialUsers[0].username,
            name: helper.initialUsers[0].name,
            password: helper.initialUsers[0].password
        }

        const error = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(error.body).toHaveProperty('error')
        expect(usersAtEnd.length).toEqual(usersAtStart.length)
    })

    test('too short username returns status 400', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'aa',
            password: helper.initialUsers[0].password
        }

        const error = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(error.body).toHaveProperty('error')
        expect(usersAtEnd.length).toEqual(usersAtStart.length)
    })

    test('too short password returns status 400', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'not_root',
            password: 'aa'
        }

        const error = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(error.body).toHaveProperty('error')
        expect(usersAtEnd.length).toEqual(usersAtStart.length)
    })

    test('missing username returns status 400', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            password: helper.initialUsers[0].password
        }

        const error = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(error.body).toHaveProperty('error')
        expect(usersAtEnd.length).toEqual(usersAtStart.length)
    })

    test('missing password returns status 400', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'not_root'
        }

        const error = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(error.body).toHaveProperty('error')
        expect(usersAtEnd.length).toEqual(usersAtStart.length)
    })
})

describe('POST login', () => {
    test('valid username an password receives token', async () => {
        const loginUser = {
            username: helper.initialUsers[0].username,
            password: helper.initialUsers[0].password
        }

        const returnedToken = await api.post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-type', /application\/json/)

        expect(returnedToken.body).toHaveProperty('token')
        expect(returnedToken.body.name).toEqual(helper.initialUsers[0].name)
        expect(returnedToken.body.username).toEqual(helper.initialUsers[0].username)
    })

    test('non existing username returns status 401', async () => {
        const loginUser = {
            username: 'not_root',
            password: helper.initialUsers[0].password
        }

        const error = await api.post('/api/login')
            .send(loginUser)
            .expect(401)
            .expect('Content-type', /application\/json/)

        expect(error.body).toHaveProperty('error')
        expect(error.body).not.toHaveProperty('token')
    })

    test('wrong password returns status 401', async () => {
        const loginUser = {
            username: helper.initialUsers[0].username,
            password: 'wrongpassword'
        }

        const error = await api.post('/api/login')
            .send(loginUser)
            .expect(401)
            .expect('Content-type', /application\/json/)

        expect(error.body).toHaveProperty('error')
        expect(error.body).not.toHaveProperty('token')
    })

    test('missing password returns status 401', async () => {
        const loginUser = {
            username: helper.initialUsers[0].username
        }

        const error = await api.post('/api/login')
            .send(loginUser)
            .expect(401)
            .expect('Content-type', /application\/json/)

        expect(error.body).toHaveProperty('error')
        expect(error.body).not.toHaveProperty('token')
    })

    test('missing username returns status 401', async () => {
        const loginUser = {
            password: helper.initialUsers[0].password
        }

        const error = await api.post('/api/login')
            .send(loginUser)
            .expect(401)
            .expect('Content-type', /application\/json/)

        expect(error.body).toHaveProperty('error')
        expect(error.body).not.toHaveProperty('token')
    })
})