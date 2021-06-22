import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Error from '../common/Error'
import { baseUrl, dreamsPath } from '../../lib/api'


import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ListGroup from 'react-bootstrap/ListGroup'







function AllDreams() {

  const [dreams, setDreams] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const isLoading = !dreams && !isError


  React.useEffect(() => {

    const getData = async () => {

      try {

        const res = await axios.get(`${baseUrl}${dreamsPath}`)
        setDreams(res.data)


      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  //* search functions
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredDreams = dreams?.filter((dream) => {
    return (
      dream.title.toLowerCase().includes(searchTerm) ||
      dream.type.includes(searchTerm) ||
      dream.settings.includes(searchTerm) ||
      dream.characters.includes(searchTerm) ||
      dream.themes.includes(searchTerm) ||
      dream.emotions.includes(searchTerm) ||
      dream.date.includes(searchTerm)
    )
  })

  return (
    <>

      <Container fluid>
        <img src="data:image/jpeg;base64,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" />
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleInput} value={searchTerm} />
          <Button variant="outline-success"  >Go</Button>
        </Form>

        <Button onClick={handleClear}>clear</Button>
        {isError && <Error />}
        {isLoading && <p>...loading</p>}
        <CardColumns>
          {filteredDreams && (filteredDreams.map(dream =>
            // eslint-disable-next-line react/jsx-key
            <Link to={`${dreamsPath}/${dream.id}`}>
              <Card>
                <Card.Img variant="top" src={dream.image_url} />
                <Card.Body>
                  <Card.Title>{dream.title}</Card.Title>
                  <Card.Text>
                    {dream.description.substring(0, 88) + '...'}
                  </Card.Text>
                  <ListGroup variant="flush">
                    {dream.type &&
                      <ListGroup.Item>{`Type: ${dream.type}`}</ListGroup.Item>
                    }
                    {/* {dream.settings &&
                      <ListGroup.Item>{`Setting: ${dream.settings}`}</ListGroup.Item>
                    }
                    {dream.characters &&
                      <ListGroup.Item>{`Characters: ${dream.characters}`}</ListGroup.Item>
                    }
                    {dream.emotions &&
                      <ListGroup.Item>{`Emotions: ${dream.emotions}`}</ListGroup.Item>
                    } */}
                    {dream.themes &&
                      <ListGroup.Item>{`Themes: ${dream.themes}`}</ListGroup.Item>
                    }
                  </ListGroup>
                </Card.Body> </Card>
            </Link>

          ))}
        </CardColumns>


      </Container>


    </>

  )
}
export default AllDreams