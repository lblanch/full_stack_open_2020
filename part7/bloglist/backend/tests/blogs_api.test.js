const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const helper = require('./test_blogs_helper')
const userHelper = require('./test_users_helper')

const api = supertest(app)

let blogUser

beforeEach(async () => {
    blogUser = await userHelper.reloadUsersDb()
    blogUser.user = await helper.reloadBlogsDb(blogUser.user._id)
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
        expect(receivedBlogs.body.length).toBe(blogUser.user.blogs.length)
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

describe('POST blogs', () => {
    describe('Success', () => {
        test('new blog is saved to server correctly', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 33
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${blogUser.token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const contents = blogsAtEnd.map(b => b.content)
            const user = await userHelper.specificUserInDb(blogUser.user._id)

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
            expect(contents).toContain(newBlog.content)
            expect(user.blogs).toHaveLength(blogUser.user.blogs.length + 1)
        })

        test('new blog without likes defaults to 0 likes', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/'
            }

            const createdBlog = await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${blogUser.token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            expect(createdBlog.body.likes).toBe('0')
        })
    })

    describe('Fail', () => {
        test('new blog with missing author returns status 400', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 4
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${blogUser.token}`)
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
                .set('Authorization', `bearer ${blogUser.token}`)
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
                .set('Authorization', `bearer ${blogUser.token}`)
                .send(newBlog)
                .expect(400)
        })

        test('new blog with missing token returns status 401', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 33
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
        })

        test('new blog with incorrect token returns status 401', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 33
            }

            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer wrongToken')
                .send(newBlog)
                .expect(401)
        })

        test('new blog with token from non-existing user returns status 401', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 33
            }

            const fakeUser = new User({ username: 'test', password: 'secret' })
            const fakeToken = userHelper.loginUser(fakeUser)

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${fakeToken}`)
                .send(newBlog)
                .expect(401)
        })

    })
})

describe('DELETE', () => {
    describe('Success', () => {
        test('Delete sucessful with a valid and existing id', async () => {
            const blogsAtBeginning = await helper.blogsInDb()
            await api.delete(`/api/blogs/${blogsAtBeginning[0].id}`)
                .set('Authorization', `bearer ${blogUser.token}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            const userAtEnd = await userHelper.specificUserInDb(blogUser.user._id)

            expect(blogsAtEnd.length).toEqual(blogsAtBeginning.length - 1)
            expect(userAtEnd.blogs).toHaveLength(blogUser.user.blogs.length - 1)
        })
    })

    describe('Fail', () => {
        test('with non existing id returns 404', async () => {
            const wrongId = await helper.nonExistingId()

            const error = await api.delete(`/api/blogs/${wrongId}`)
                .set('Authorization', `bearer ${blogUser.token}`)
                .expect(404)

            expect(error.body).toHaveProperty('error')
        })

        test('Status 400 with an invalid id', async () => {
            const error = await api.delete('/api/blogs/1')
                .set('Authorization', `bearer ${blogUser.token}`)
                .expect(400)
                .expect('Content-type', /application\/json/)

            expect(error.body).toHaveProperty('error')
        })

        test('without token status 401 is returned', async () => {
            const blogsAtBeginning = await helper.blogsInDb()
            const error = await api.delete(`/api/blogs/${blogsAtBeginning[0].id}`)
                .expect(401)

            expect(error.body).toHaveProperty('error')
        })

        test('with invalid token status 401 is returned', async () => {
            const blogsAtBeginning = await helper.blogsInDb()
            const error = await api.delete(`/api/blogs/${blogsAtBeginning[0].id}`)
                .set('Authorization', 'bearer invalidToken')
                .expect(401)

            expect(error.body).toHaveProperty('error')
        })

        test('with token from a different user than the blog owner status 401 is returned', async () => {
            const blogsAtBeginning = await helper.blogsInDb()

            const fakeUser = new User({ username: 'test', password: 'secret' })
            const fakeToken = userHelper.loginUser(fakeUser)

            const error = await api.delete(`/api/blogs/${blogsAtBeginning[0].id}`)
                .set('Authorization', `bearer ${fakeToken}`)
                .expect(401)

            expect(error.body).toHaveProperty('error')
        })
    })
})

describe('PUT', () => {
    describe('Success', () => {
        test('blog is updated to server correctly', async () => {
            const existingBlogs = await helper.blogsInDb()
            const updatedBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 33
            }

            const returnedBlog = await api
                .put(`/api/blogs/${existingBlogs[0].id}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(returnedBlog.body.title).not.toEqual(existingBlogs[0].title)
            expect(returnedBlog.body.author).not.toEqual(existingBlogs[0].author)
            expect(returnedBlog.body.url).not.toEqual(existingBlogs[0].url)
            expect(returnedBlog.body.likes).not.toEqual(existingBlogs[0].likes)
            expect(returnedBlog.body.title).toEqual(updatedBlog.title)
            expect(returnedBlog.body.author).toEqual(updatedBlog.author)
            expect(returnedBlog.body.url).toEqual(updatedBlog.url)
            expect(returnedBlog.body.likes).toEqual(updatedBlog.likes.toString())
        })

        test('blog is partially updated to server correctly', async () => {
            const existingBlogs = await helper.blogsInDb()
            const updatedBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
            }

            const returnedBlog = await api
                .put(`/api/blogs/${existingBlogs[0].id}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(returnedBlog.body.title).not.toEqual(existingBlogs[0].title)
            expect(returnedBlog.body.author).not.toEqual(existingBlogs[0].author)
            expect(returnedBlog.body.title).toEqual(updatedBlog.title)
            expect(returnedBlog.body.author).toEqual(updatedBlog.author)
            expect(returnedBlog.body.url).toEqual(existingBlogs[0].url)
            expect(returnedBlog.body.likes).toEqual(existingBlogs[0].likes)
        })
    })

    describe('Fail', () => {
        test('invalid blog returns status 400', async () => {
            const existingBlogs = await helper.blogsInDb()
            const updatedBlog = {
                title: '',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/'
            }

            const error = await api
                .put(`/api/blogs/${existingBlogs[0].id}`)
                .send(updatedBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(error.body).toHaveProperty('error')
        })

        test('non existing id returns status 404', async () => {
            const wrongId = await helper.nonExistingId()
            const updatedBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 4
            }

            const error = await api
                .put(`/api/blogs/${wrongId}`)
                .send(updatedBlog)
                .expect(404)
                .expect('Content-Type', /application\/json/)

            expect(error.body).toHaveProperty('error')
        })

        test('invalid id returns status 400', async () => {
            const newBlog = {
                title: 'A timing attack with CSS selectors and Javascript',
                author: 'Sigurd Kolltveit',
                url: 'https://blog.sheddow.xyz/css-timing-attack/',
                likes: 4
            }

            const error = await api
                .put('/api/blogs/1')
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(error.body).toHaveProperty('error')
        })
    })
})

describe('POST comments', () => {
    let existingBlogs

    describe('Success', () => {
        beforeEach(async () => {
            existingBlogs = await helper.blogsInDb()
        })

        test('new comment is saved to server correctly, with token', async () => {
            const newComment = { comment: 'additonal comment' }

            const updatedBlog = await api
                .post(`/api/blogs/${existingBlogs[0].id}/comments`)
                .set('Authorization', `bearer ${blogUser.token}`)
                .send(newComment)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            expect(updatedBlog.body.comments).toHaveLength(existingBlogs[0].comments.length + 1)
            expect(updatedBlog.body.comments).toContain(newComment.comment)
        })

        test('new comment is saved to server correctly, without token', async () => {
            const newComment = { comment: 'additonal comment without token' }

            const updatedBlog = await api
                .post(`/api/blogs/${existingBlogs[0].id}/comments`)
                .send(newComment)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            expect(updatedBlog.body.comments).toHaveLength(existingBlogs[0].comments.length + 1)
            expect(updatedBlog.body.comments).toContain(newComment.comment)
        })
    })

    describe('Fail', () => {
        test('new comment with missing comment returns status 400', async () => {
            existingBlogs = await helper.blogsInDb()

            await api
                .post(`/api/blogs/${existingBlogs[0].id}/comments`)
                .set('Authorization', `bearer ${blogUser.token}`)
                .send({})
                .expect(400)
        })

        test('new comment with non existing blog id returns status 404', async () => {
            const wrongId = await helper.nonExistingId()
            const newComment = { comment: 'additonal comment without token' }

            await api
                .post(`/api/blogs/${wrongId}/comments`)
                .set('Authorization', `bearer ${blogUser.token}`)
                .send(newComment)
                .expect(404)
        })

        test('new comment with invalid blog id returns status 404', async () => {
            const newComment = { comment: 'additonal comment without token' }

            await api
                .post('/api/blogs/1/comments')
                .set('Authorization', `bearer ${blogUser.token}`)
                .send(newComment)
                .expect(400)
        })
    })
})