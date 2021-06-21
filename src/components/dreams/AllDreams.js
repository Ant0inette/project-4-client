import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Error from '../common/Error'
import { baseUrl, dreamsPath } from '../../lib/api'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'




function AllDreams() {

  const [dreams, setDreams] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
 
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

 

  const filteredDreams = dreams?.filter((dream) => {
    return (
      dream.title.toLowerCase().includes(searchTerm) ||
      dream.type.includes(searchTerm) ||
      dream.setting.includes(searchTerm) ||
      dream.characters.includes(searchTerm) ||
      dream.themes.includes(searchTerm) ||
      dream.emotions.includes(searchTerm) ||
      dream.date.includes(searchTerm)
    )
  })

  return (
    <>

      <Container fluid>

        {isError && <Error />}
        {isLoading && <p>...loading</p>}
        <CardColumns>
          {filteredDreams && (filteredDreams.map(dream =>
            // eslint-disable-next-line react/jsx-key
            <Link to={`${dreamsPath}/${dream._id}`}>
              <Card><Card.Img variant="top" src={dream.image} />
                <Card.Body>
                  <Card.Title>{dream.title}</Card.Title>
                  <Card.Text>
                    {dream.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </CardColumns>


      </Container>


    </>

  )
}
export default AllDreams