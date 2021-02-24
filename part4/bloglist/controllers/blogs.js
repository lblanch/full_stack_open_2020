const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = request => {
    const authHeader = request.get('authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('bearer')) {
        return authHeader.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(request.body)
    blog.user = decodedToken.id

    const newBlog = await blog.save()

    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).send({ error: 'not found' })
    }
})

module.exports = blogsRouter