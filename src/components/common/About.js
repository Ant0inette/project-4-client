import React from 'react'
import Link from 'react-dom'

function About() {
  React.useEffect(() => {
    console.log('About Page mounted')
  }, [])

  return (
    <>
      <h1> About </h1>
      <Link to='https://bit.ly/3q6663n'> The science behind Endless</Link>
    </>
  )
}

export default About