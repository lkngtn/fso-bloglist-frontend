import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type, duration) => {
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification(null)
    }, duration)
  }

  const addBlog = async (blogObject) => {
    addBlogRef.current.toggleVisibility()
    setBlogs(blogs.concat(await blogService.create(blogObject)))
    notify(`Successfully added '${blogObject.title}'`, 'success', 5000)
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    notify('Logout Sucessful', 'success', 5000)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      notify('Login Successful', 'success', 5000)
    } catch ( exception ) {
      notify('Wrong Credentials', 'error', 5000)
    }
  }

  const deleteBlog = async (blog) => {
    await blogService.destroy(blog.id)
    notify(`Successfully deleted: '${blog.title}'`, 'success', 5000)
    setBlogs(blogs.filter(blogInDb => blogInDb.id !== blog.id ))
  }

  const addBlogRef = useRef()

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>blogs</h2>
      {user === null ?
        <LoginForm login={login} /> : 
        <div>
          <p>{user.name} logged-in <button onClick={logout}>logout</button></p>
          <Togglable buttonLabel='add blog' ref={addBlogRef}>
            <AddBlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      }  
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App