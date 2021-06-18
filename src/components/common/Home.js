import React from 'react'
// import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Login from '../auth/Login'
import Accordion  from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Home() {

  React.useEffect(() => {
    console.log('HomePage mounted.')
  }, [])



  return (
    <>
      <h1>Home</h1>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/EGsFQlc.png"
            alt="First slide"
          />
          <Carousel.Caption>
          
            <p> Before they fizzle away...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/uhloMEX.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <p>Store a trace of your dreams...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/CHtQa63.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            
            <p>Have them illustrated by state-of-the-art neural networks today.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <footer>
        <Accordion >
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Login
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Login />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </footer>
    </>


  )
}


export default Home