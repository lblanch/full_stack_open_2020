import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
    <div className="blog">
        <Link to={`/blogs/${blog.id}`}>
            &quot;{blog.title}&quot; by {blog.author}
        </Link>
    </div>
)

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <div>
            <h2>blog list</h2>
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
        </div>
    )
}

export default BlogList