import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let addLike

  const blog = {
    title: 'this is a blog title',
    url: 'www.website.com',
    author: 'bob ross',
    likes: 2
  }

  beforeEach(() => {
    addLike = jest.fn()
    container = render(
      <Blog blog={blog} addLike={addLike} />
    ).container
  })

  test('renders content', () => {
    const element = container.querySelector('.blogEntry')
    expect(element).toBeDefined()
  })

  test('title is visible by default', () => {
    const element = screen.getByText('this is a blog title')
    expect(element).toBeDefined()
  })

  test('author, likes, and url visible after clicking show button', async () => {
    const button = screen.getByText('show')
    await userEvent.click(button)

    const author = await screen.findByText('bob ross')
    expect(author).toBeDefined()

    const url = await screen.findByText('www.website.com')
    expect(url).toBeDefined()

    const likes = await screen.findByText('like')
    expect(likes).toBeDefined()
  })

  test('clicking like button twice calls addLike fn twice', async () => {
    const showButton = screen.getByText('show')
    await userEvent.click(showButton)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})



