import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './addBlogForm'

describe('<AddBlogForm />', () => {
  let addBlog
  let container

  beforeEach(() => {
    addBlog = jest.fn()
    container = render(<AddBlogForm addBlog={addBlog} />).container
  })

  test('Calls addBlog with correct data', async () => {
    const blog = {
      title: 'this is a test',
      author: 'bob ross',
      url: 'www.bobsblog.com'
    }

    const submitButton = screen.getByText('add blog')
    const titleInput = container.querySelector('#add-blog-title')
    await userEvent.type(titleInput, blog.title)
    const authorInput = container.querySelector('#add-blog-author')
    await userEvent.type(authorInput, blog.author)
    const urlInput = container.querySelector('#add-blog-url')
    await userEvent.type(urlInput, blog.url)
    await userEvent.click(submitButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('this is a test')
    expect(addBlog.mock.calls[0][0].author).toBe('bob ross')
    expect(addBlog.mock.calls[0][0].url).toBe('www.bobsblog.com')
  })
})