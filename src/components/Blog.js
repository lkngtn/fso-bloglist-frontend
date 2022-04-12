import React from 'react'

const Blog = ({blog, handleDelete, user}) => {
  return (
    <div>
      {blog.title} {blog.author} {user && blog.user.id === user.id && <button onClick={() => handleDelete(blog)}> delete </button>}
    </div>  
  )
}

export default Blog