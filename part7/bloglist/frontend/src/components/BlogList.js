import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    Typography
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
    <TableRow>
        <TableCell>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </TableCell>
        <TableCell>{blog.author}</TableCell>
    </TableRow>
)

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <div>
            <Typography variant="h4" gutterBottom>Blog list</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Blog Title</TableCell>
                            <TableCell>Author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BlogList