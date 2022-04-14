import { useState } from 'react'
import PropTypes from 'prop-types'
import Toggalable from './Togglable'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <Toggalable showLabel='login' hideLabel='cancel'>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type='text'
            id='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            id='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </Toggalable>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm