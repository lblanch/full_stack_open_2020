import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

const blog = {
    title: 'test title for test',
    author: 'Test McAuthor',
    url: 'www.testurl.com',
    likes: 9,
    user: {
        name: 'Test McUser',
        username: 'test-root'
    }
}

describe('<Blog /> togglability', () => {
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} loggedUser="test-root" />
        )
    })

    test('by default displays title and author but does not display url and likes', () => {
        const titleAuthor = component.getByText(`"${blog.title}" by ${blog.author}`)

        expect(titleAuthor).toBeDefined()
        expect(titleAuthor).toBeVisible()

        const url = component.getByText(blog.url)
        const likes = component.getByText(`likes ${blog.likes}`)
        const username = component.getByText(blog.user.name)

        expect(url).not.toBeVisible()
        expect(likes).not.toBeVisible()
        expect(username).not.toBeVisible()
    })

    test('after using view button displays all blog info', () => {
        const viewButton = component.getByRole('button', { name: 'view' })
        fireEvent.click(viewButton)

        const titleAuthor = component.getByText(`"${blog.title}" by ${blog.author}`)

        expect(titleAuthor).toBeDefined()
        expect(titleAuthor).toBeVisible()

        const url = component.getByText(blog.url)
        const likes = component.getByText(`likes ${blog.likes}`)
        const username = component.getByText(blog.user.name)

        expect(url).toBeVisible()
        expect(likes).toBeVisible()
        expect(username).toBeVisible()
    })
})

describe('<Blog /> like and delete functionality', () => {
    let component

    let mockLikeHandler
    let mockDeleteHandler

    beforeEach(() => {
        mockLikeHandler = jest.fn()
        mockDeleteHandler = jest.fn()

        component = render(
            <Blog
                blog={blog}
                likeBlog={mockLikeHandler}
                deleteBlog={mockDeleteHandler}
                loggedUser="test-root"
            />
        )

        const viewButton = component.getByRole('button', { name: 'view' })
        fireEvent.click(viewButton)
    })

    test('like button fires the like function', () => {
        const likeButton = component.getByRole('button', { name: 'like' })
        fireEvent.click(likeButton)

        expect(mockLikeHandler.mock.calls).toHaveLength(1)

        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLikeHandler.mock.calls).toHaveLength(4)
    })

    test('delete button fires the delete function', () => {
        const deleteButton = component.getByRole('button', { name: 'remove' })
        fireEvent.click(deleteButton)

        expect(mockDeleteHandler.mock.calls).toHaveLength(1)

        fireEvent.click(deleteButton)
        fireEvent.click(deleteButton)
        fireEvent.click(deleteButton)

        expect(mockDeleteHandler.mock.calls).toHaveLength(4)
    })
})

