import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

const mockCreateBlog = jest.fn()

const component = render(
    <BlogForm createBlog={mockCreateBlog} />
)

test('', () => {
    const newBlog = {
        title: 'test title for test',
        author: 'Test McAuthor',
        url: 'www.testurl.com'
    }
    const form = component.getByRole('form')
    const titleInput = component.getByRole('textbox', { name: 'Title' })
    const authorInput = component.getByRole('textbox', { name: 'Author' })
    const urlInput = component.getByRole('textbox', { name: 'URL' })

    fireEvent.change(titleInput, { target: { value: newBlog.title } })
    fireEvent.change(authorInput, { target: { value: newBlog.author } })
    fireEvent.change(urlInput, { target: { value: newBlog.url } })

    fireEvent.submit(form)

    expect(mockCreateBlog.mock.calls[0][0]).toEqual(newBlog)
})
