const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject
    for (let blog of helper.initialBlogs) {
        blogObject = new Blog(blog)
        await blogObject.save()
    }
})

afterAll(() => {
    mongoose.connection.close()
})

test('fetch blogs from server', async () => {
    const receivedBlogs = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)

    expect(receivedBlogs.body.length).toBe(helper.initialBlogs.length)
})