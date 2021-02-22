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

describe('GET', () => {
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
})

describe('POST', () => {
    test('new blog is saved to server correctly', async () => {
        const newBlog = {
            title: 'A timing attack with CSS selectors and Javascript',
            author: 'Sigurd Kolltveit',
            url: 'https://blog.sheddow.xyz/css-timing-attack/',
            likes: 33
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(b => b.content)

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toContain(newBlog.content)
    })

    test('new blog without likes defaults to 0 likes', async () => {
        const newBlog = {
            title: 'A timing attack with CSS selectors and Javascript',
            author: 'Sigurd Kolltveit',
            url: 'https://blog.sheddow.xyz/css-timing-attack/'
        }

        const createdBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(createdBlog.body.likes).toBe('0')
    })

    test('new blog with missing author returns status 400', async () => {
        const newBlog = {
            title: 'A timing attack with CSS selectors and Javascript',
            url: 'https://blog.sheddow.xyz/css-timing-attack/',
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('new blog with missing url returns status 400', async () => {
        const newBlog = {
            title: 'A timing attack with CSS selectors and Javascript',
            author: 'Sigurd Kolltveit',
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('new blog with missing title returns status 400', async () => {
        const newBlog = {
            author: 'Sigurd Kolltveit',
            url: 'https://blog.sheddow.xyz/css-timing-attack/',
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('DELETE', () => {
    test('Delete sucessful with a valid and existing id', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        await api.delete(`/api/blogs/${blogsAtBeginning[0].id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toEqual(blogsAtBeginning.length - 1)
    })

    test('No deletion but no error with a valid but non existing id', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const wrongId = await helper.nonExistingId()

        await api.delete(`/api/blogs/${wrongId}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toEqual(blogsAtBeginning.length)
    })

    test('Status 400 with an invalid id', async () => {
        const error = await api.delete('/api/blogs/1')
            .expect(400)
            .expect('Content-type', /application\/json/)

        expect(error.body).toHaveProperty('error')
    })
})