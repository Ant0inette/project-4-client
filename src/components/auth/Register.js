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
      <img src="data:image/jpeg;base64,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"/>
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