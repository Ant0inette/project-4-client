import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'


import Error from '../common/Error'
import { baseUrl, dreamsPath, commentPath, headers, deleteDream, editPath } from '../../lib/api'
import { isOwner } from '../../lib/auth'
// import { FormLabel, FormText } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import { InputGroup } from 'react-bootstrap'



function Singledream() {

  const { dreamId } = useParams()
  const history = useHistory()

  const [dream, setdream] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [hasComments, setHasComments] = React.useState(false)

  const isLoading = !dream && !isError

  //* for comments/error state
  const [formComment, setFormComment] = React.useState({
    text: '',
  })
  const [formError, setFormError] = React.useState(formComment)


  //* For page content render
  React.useEffect(() => {

    const getData = async () => {

      try {

        const res = await axios.get(`${baseUrl}${dreamsPath}/${dream.id}`)
        setdream(res.data)

      } catch (err) {
        setIsError(true)
      }
    }

    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasComments])


  const handleChange = (e) => {
    setFormComment({
      ...formComment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    // * to prevent empty comments submissions
    if (formComment.text) {
      try {

        await axios.post(
          `${baseUrl}${dreamsPath}/${dreamId}/${commentPath}`,
          formComment,
          headers()
        )

        // * reset comment Input
        e.target.value = ''

        // * force useEffect render on comment submission
        setHasComments(!hasComments)

        // * reset comment Forms to blank
        setFormComment({ ...formComment, text: '' })
        setFormError('')

      } catch (err) {
        setFormError({ ...formError, text: err.response.data.errMessage })
      }

    } else {
      return
    }
  }


  // //* Delete a comment 
  const handleDelete = async (e) => {

    e.preventDefault()

    try {

      await axios.delete(
        `${baseUrl}${dreamsPath}/${dreamId}/${commentPath}/${e.target.name}`,
        headers()
      )

      setHasComments(!hasComments)
      setFormError({ ...formComment, text: '' })

    } catch (err) {
      setFormError({ ...formError, text: err.response.data.errMessage })
    }
  }

  // //* Delete a dream
  const handleDreamDelete = async () => {
    const shouldDelete = confirm('Are you sure you want to delete?')
    if (shouldDelete) {
      console.log(dream._id)
      await deleteDream(dream._id)
      history.push(dreamsPath)
    }
  }

  //* Edit a dream
  const handleDreamEdit = async () => {
    history.push(`${dreamsPath}/${dream._id}${editPath}`)
  }



  const [lgShow, setLgShow] = React.useState(false)

  return (
    <>

      {isError && <Error />}
      {isLoading && <p> ... loading</p>}

      {dream &&
        <section>
          <Button onClick={() => setLgShow(true)}>Large modal</Button>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                {dream.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image variant="top" src={dream.image_url} />
              <Modal.Text>
                {dream.description}
              </Modal.Text>
              <ListGroup variant="flush">
                {dream.type &&
                  <ListGroup.Item>{`Type: ${dream.type}`}</ListGroup.Item>
                }
                {dream.settings &&
                  <ListGroup.Item>{`Setting: ${dream.settings}`}</ListGroup.Item>
                }
                {dream.characters &&
                  <ListGroup.Item>{`Characters: ${dream.characters}`}</ListGroup.Item>
                }
                {dream.emotions &&
                  <ListGroup.Item>{`Emotions: ${dream.emotions}`}</ListGroup.Item>
                }
                {dream.themes &&
                  <ListGroup.Item>{`Themes: ${dream.themes}`}</ListGroup.Item>
                }
                {dream.date &&
                  <ListGroup.Item>{dream.date}</ListGroup.Item>
                }
                <ListGroup.Item>{dream.user.username}</ListGroup.Item>

              </ListGroup>
              {isOwner(dream.user.userId) &&
                <button
                  className="button is-warning"
                  onClick={handleDreamEdit}
                >Edit dream</button>
              }
              {isOwner(dream.user.userId) &&
                <button
                  className="button is-danger"
                  onClick={handleDreamDelete}
                >Delete dream</button>
              }

              <section className="post-comments">
                <Form onSubmit={handleSubmit}
                  onKeyUp={(
                    (e) => {
                      if (e.key === 'Enter') handleSubmit
                    }
                  )}
                >

                  <div className="field" htmlFor="text">
                    <FormLabel className="label">Comments</FormLabel>
                    <FormControl>

                      <InputGroup
                        variant={` ${formError.text ? 'danger' : ''} `}
                        placeholder="Type your comments here.."
                        name="text"
                        value={formComment.text || ''}
                        onChange={handleChange}
                      />

                    </FormControl>
                    {formError.text
                      &&
                      <p variant="danger">
                        Oops, something went wrong. Check if you are logged in.
                      </p>
                    }
                  </div>

                  <section>
                    <Button
                      type="submit"
                      variant="info"
                    >
                      Submit comment
                    </Button>
                  </section>


                </Form>
              </section>

              <section className="comments">
                {dream.comments && dream.comments.map(comment => {

                  return (
                    <section key={comment._id}>

                      <h6>{comment.user.username}</h6>
                      <p>{comment.text}</p>

                      {isOwner(comment.user.userId) &&
                        <Button
                          name={comment._id}
                          onClick={handleDelete}
                          className="info"
                        >
                          Delete comment
                        </Button>
                      }

                    </section>
                  )
                }
                )

                }
              </section>
              )
            </Modal.Body>
          </Modal>
        </section>
      }
    </>
  )

}


export default Singledream