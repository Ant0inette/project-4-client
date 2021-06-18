import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'


import { useForm } from '../../hooks/useForm'
import { createDream, dreamsPath } from '../../lib/api'


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { createNamespaceExportDeclaration } from 'typescript'


function NewDream() {

  const history = useHistory()

  const { formData, setFormData, handleChange, formError, setFormError } = useForm({
    title: '',
    date: '',
    descriptionP: '',
    caption: '',
    image: '',
    // user
  })

  // const handleNestedChange = (e) => {

  //   // const getBoundaryBox = (e) => {
  //   //   if (e.bbox) return e.bbox
  //   // }

  //   handleChange(
  //     {
  //       target:
  //       {
  //         name: 'caption',
  //         value: {
  //           ...formData.caption,
  //         },
  //       },
  //     })
  // }



  const handleDanger = (e) => {

    const emptyField = (e.target.value.length === 0)
    const requiredFields = ['title', 'description', 'caption']

    if (requiredFields.includes(e.target.name) && emptyField) {
      setFormError({ ...formError, [e.target.name]: 'Required field.' })
    }

    if (formError.errMessage) {
      setFormError({ ...formError, errMessage: '' })
    }
  }

  const handleRequest = (e) => {
    e.preventDefault()
    const caption = (formData)
    const token = 'pHKVUx8JEhVY2Pqtzg'



    axios.post('https://attngan-19b49156.hosted-models.runwayml.cloud/v1/query',
      { 'caption': `${caption}` }, {
        headers: {
          'Authorization': `Basic ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Accept: application / json,
  // Authorization: Bearer 'UDM/pHKVUx8JEhVY2Pqtzq==',
  // responseType: 'json'



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createDream(formData)
      history.push(`${dreamsPath}/${res.data._id}`)
    } catch (err) {
      setFormError({ ...formError, errMessage: err.response.data.errMessage })
    }
  }

  return (
    <>
      <h1>New Dream</h1>
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="Title" />
          </Col>
          {/* <Col>
            <Form.Control placeholder="Date & Time" /> 
          </Col> */}
        </Row>
        <Row>          <Col>
          <Form.Control placeholder="Description" />
        </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="Type words to describe the dream until the image is satisfactory" />
            <Button type="submit" onSubmit={handleRequest}> Render Sketch </Button>
          </Col>
        </Row>
        <Button variant="primary" type="submit" onSubmit={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default NewDream