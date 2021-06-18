import React from 'react'
import Link from 'react-dom'
import IframePage from './Iframe'
import Button from 'react-bootstrap/Button'

function About() {
  React.useEffect(() => {
    console.log('About Page mounted')
  }, [])

  return (
    <>
      <h1> About </h1>
      <Button variant="warning" target="blank" href='https://bit.ly/3q6663n'> <img src="https://i.imgur.com/jeGVN7H.png" alt=""/> AttnGAN Research Papers </Button>
      <IframePage />

    

    </>
  )
}

export default About