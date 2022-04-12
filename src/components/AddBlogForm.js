import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = () => {

  const emptyBlog = {
    title: '',
    author: '',
    url: ''
  }

  const [newBlog, setNewBlog] = useState(emptyBlog)

  const handleChange = (event) => {
    setNewBlog({...newBlog, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    blogService.create(newBlog)
    setNewBlog(emptyBlog)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
          <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add blog</button>
    </form>
  )
}

export default AddBlogForm