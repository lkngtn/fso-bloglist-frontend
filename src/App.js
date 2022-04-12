import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    notify('Logout Sucessful', 'success', 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      notify('Login Successful', 'success', 5000)
    } catch ( exception ) {
      notify('Wrong Credentials', 'error', 5000)
    }
  }

  const handleDelete = async (blog) => {
    await blogService.destroy(blog.id)
    notify(`Successfully deleted: '${blog.title}'`, 'success', 5000)
    setBlogs(blogs.filter(blogInDb => blogInDb.id !== blog.id ))
  }

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>blogs</h2>
      {user === null ?
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
        /> : 
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='Add Blog'>
            <AddBlogForm blogs={blogs} setBlogs={setBlogs} notify={notify} />
          </Togglable>
        </div>
      }  
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} user={user} />
      )}
    </div>
  )
}

export default App