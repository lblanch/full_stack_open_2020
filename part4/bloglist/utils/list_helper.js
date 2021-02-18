const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    const maxLikes = blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog)

    return {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    return _(blogs)
        .countBy('author')
        .map((value, key) => {
            return { author: key, blogs: value }
        })
        .maxBy('blogs')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }