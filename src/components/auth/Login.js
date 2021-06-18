import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'

function Login() {

  const history = useHistory()
  const [errorMessage, setErrorMessage] = React.useState('')
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const req = await loginUser(formData)
      setToken(req.data.token)
      history.push('/memories')
    } catch (err) {
      setErrorMessage(err.response.data.errMessage.password)
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            variant={`${errorMessage ? 'danger' : ''}`}
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text variant='light'>
            We`ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary"
          type="submit"
          onChange={handleChange}>
          Submit
        </Button>
      </Form>
    </>

  )
}

export default Login