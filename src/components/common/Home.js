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
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
          
            <p> Before they fizzle away...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
          />

          <Carousel.Caption>
            <p>Store a trace of your dreams...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            
            <p>Have them illustrated by state-of-the-art neural networks today.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <footer>
        <Accordion defaultActiveKey="0">
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