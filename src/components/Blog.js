import React from 'react'

const Blog = ({blog, handleDelete}) => (
  <div>
    {blog.title} {blog.author} <button onClick={() => handleDelete(blog)}> delete </button>
  </div>  
)

export default Blog