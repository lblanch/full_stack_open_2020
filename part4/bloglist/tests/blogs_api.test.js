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

test('blog contains id property', async () => {
    const receivedBlogs = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)

    receivedBlogs.body.forEach(blog => {
        expect(blog).toHaveProperty('id')
        expect(blog).not.toHaveProperty('_id')
    })
})

test('new blog is saved to server correctly', async () => {
    const newBlog = {
        title: 'A timing attack with CSS selectors and Javascript',
        author: 'Sigurd Kolltveit',
        url: 'https://blog.sheddow.xyz/css-timing-attack/',
        likes: 33
    }

    //We receive status 200, and receive the newly saved note as json
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.content)

    //The total amount of notes has been increased
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(newBlog.content)
})