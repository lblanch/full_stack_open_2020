const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(request.body)
    blog.user = decodedToken.id
    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        response.status(404).send({ error: 'not found' })
    }

    if (blog.user.toString() !== decodedToken.id) {
        return response.status(401).json({ error: 'only the user who created the blog can delete it' })
    }
    await blog.remove()

    const user = await User.findById(decodedToken.id)

    user.blogs = user.blogs.filter((userBlog) => userBlog.toString() !== blog._id.toString())
    await user.save()

    response.status(204).end()
})

//TODO: update below so blogs can only be updated by the user that created them (needs token)
blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).send({ error: 'not found' })
    }
})

module.exports = blogsRouter