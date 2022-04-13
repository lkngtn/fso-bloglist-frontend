import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show' }</button>
      {user && blog.user.id === user.id && <button onClick={() => deleteBlog(blog)}> delete </button>}
      {visible &&
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}<button onClick={() => addLike(blog)}> like </button></p>
          <p>{blog.author}</p>
        </div>
      }
    </div>
  )
}

export default Blog