import React from 'react'
// import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Login from '../auth/Login'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Home() {

  React.useEffect(() => {
    console.log('HomePage mounted.')
  }, [])



  return (
    <>
      <header>
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
      </header>
      <Carousel>
        <Carousel.Item>

          <img
            className="d-block w-100"
            src="https://i.imgur.com/EGsFQlc.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1> Endless Dreamlog</h1>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/uhloMEX.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h2>Before they fizzle away... Store a trace of your dreams...</h2> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/CHtQa63.png"
            alt="Third slide"
          />

          <Carousel.Caption>

            <h3> illustrated by state-of-the-art neural networks</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </>


  )
}


export default Home