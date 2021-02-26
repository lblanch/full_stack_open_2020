const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
]

const blogsInDb = async () => {
    return await Blog.find({})
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'tobedeleted', author: 'toberemoved', url: 'tobeeliminated' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const specificBlogInDb = async (id) => {
    return await Blog.findById(id)
}

const reloadBlogsDb = async (userId) => {
    const blogsForUser = []
    await Blog.deleteMany({})

    let blogObject
    for (let blog of initialBlogs) {
        blogObject = new Blog(blog)
        blogObject.user = userId
        await blogObject.save()
        blogsForUser.push(blogObject._id)
    }
    const user = await User.findById(userId)
    user.blogs = blogsForUser
    await user.save()
}

module.exports = { initialBlogs, blogsInDb, nonExistingId, specificBlogInDb, reloadBlogsDb }