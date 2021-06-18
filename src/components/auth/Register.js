import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { userCheck, registerUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import ImageUpload from '../dreams/ImageUpload'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

function Register() {

  const history = useHistory()

  // * check if email && username are unique
  const [isUniqueId, setIsUniqueId] = React.useState(true)

  // * check password match
  const [isPasswordMatch, setIsPasswordMatch] = React.useState(true)

  // * useform hook
  const { formData, handleChange, formError, setFormError } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profile_image: '',
  })


  const handleUpload = (file) => {
    handleChange({ target: { name: 'image', value: file } })
  }

  const handleValidity = () => {
    setFormError({ ...formError, email: 'This email is invalid.' })
  }

  const handlePassMatch = async () => {
    if (
      (formData.password !== formData.passwordConfirmation)
      &&
      (formData.passwordConfirmation !== '')
    ) {
      setIsPasswordMatch(false)
      setFormError({ ...formError, passwordConfirmation: 'Passwords do not match.' })
    } else if (formData.password === formData.passwordConfirmation) {
      setIsPasswordMatch(true)
      setFormError({ ...formError, passwordConfirmation: '' })
    }
  }

  const handleUnique = async () => {
    console.log('formData: ', formData)
    try {
      const res = await userCheck({
        username: formData.username,
        email: formData.email,
      })

      console.log('res: ', res)

      setIsUniqueId(true)
      setFormError({ ...formError, username: '' })
    } catch (err) {
      console.log('err.response.data: ', err.response.data)
      const errorMessage = err.response.data.errMessage.username
      setIsUniqueId(false)
      setFormError({ ...formError, username: errorMessage })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(e)

    try {
      const res = await registerUser(formData)
      setToken(res.data.token)
      history.push('/dreams')
    } catch (err) {
      const errorMessage = err.response.data.errMessage
      console.log('errMessage: ', errorMessage)
      console.log('err.response: ', err.response)
      setFormError({ ...formError, ...errorMessage })
    }
  }

  return (
    <>
      <div>register</div>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
          Username
        </Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text
            >@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="inlineFormInputGroupUsername" placeholder="Username" name="username"
            onChange={handleChange}
            onBlur={handleUnique} />
        </InputGroup>


        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            variant={`${!isUniqueId || formError.username ? 'danger' : ''}
          `}
            typ
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            onInvalid={handleValidity}
            onBlur={handleUnique} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            variant={`${!isPasswordMatch ? 'danger' : ''}`}
            type="password" placeholder="Password"
            onChange={handleChange}
            onBlur={handlePassMatch} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            variant={`${!isPasswordMatch ? 'danger' : ''}`}
            type="password" placeholder="Type Password Again"
            onChange={handleChange}
            onBlur={handlePassMatch} />
        </Form.Group>
        <Form.Group controlId="formGroupProfilePicture">
          <ImageUpload onUpload={handleUpload} />
        </Form.Group>
        {/* ! profile picture upload field */}
        <Button
          variant="primary" type="submit">
          Submit
        </Button>
      </Form>



      {/* <p>{console.log('formError: ', formError)}</p>
      <section>
        <div>
          <div>
            <form
              onSubmit={handleSubmit}
            >
              <field>
                <label>Username</label>
                <input
                  className=
                    {`input 
                ${!isUniqueId ? 'is-danger' : ''}
                `}
                  type="text"
                  placeholder="e.g. dreamer666"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleUnique}
                />
                <p>
                  {!isUniqueId && 'Invalid credentials, try something else.'}
                </p>
              </field>

              <field>
                <label>Email</label>
                <div>
                  <input
                    className=
                      {`input 
                ${!isUniqueId || formError.username ? 'is-danger' : ''}
                `}
                    type="email"
                    placeholder="e.g. muppet754@mail.sz"
                    name="email"
                    onChange={handleChange}
                    onInvalid={handleValidity}
                    onBlur={handleUnique}
                  />
                </div>
                <p>
                  {formError.email}
                </p>

                <field>
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={`input ${!isPasswordMatch ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="$4n7m4n"
                      name="password"
                      onChange={handleChange}
                      onBlur={handlePassMatch}
                    />
                  </div>
                </field>

                <field>
                  <label>Password Confirmation</label>
                  <div>
                    <input
                      className={`input ${!isPasswordMatch ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="e.g. soulfuldreamyclouds"
                      name="passwordConfirmation"
                      onChange={handleChange}
                      onBlur={handlePassMatch}
                    />
                  </div>
                  <p>
                    {!isPasswordMatch && 'Passwords not matching'}
                  </p>
                </field>

                <button type="submit">
                  Submit
                </button>
              </field>
            </form>
          </div>
          <div className="column is-half">
            <figure className="image">
              <img src="https://imgur.com/DCugnIH.png" />
            </figure>
          </div>
        </div>
      </section> */}
    </>
  )
}

export default Register