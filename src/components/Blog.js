import React from 'react'

const Blog = ({blog, deleteBlog, user}) => {
  return (
    <div>
      {blog.title} {blog.author} {user && blog.user.id === user.id && <button onClick={() => deleteBlog(blog)}> delete </button>}
    </div>  
  )
}

export default Blog