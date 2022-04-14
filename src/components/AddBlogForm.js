import React, { useState } from 'react'

const AddBlogForm = ({ addBlog }) => {

  const emptyBlog = {
    title: '',
    author: '',
    url: ''
  }

  const [newBlog, setNewBlog] = useState(emptyBlog)

  const handleChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog(emptyBlog)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Blog</h3>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleChange}
          id='add-blog-title'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleChange}
          id='add-blog-author'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleChange}
          id='add-blog-url'
        />
      </div>
      <button type="submit" id='add-blog-submit-button'>add blog</button>
    </form>
  )
}

export default AddBlogForm