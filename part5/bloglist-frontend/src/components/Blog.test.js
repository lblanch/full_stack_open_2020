import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog /> togglability', () => {
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
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} loggedUser="Test McUser" />
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

