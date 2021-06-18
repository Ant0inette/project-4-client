import React from 'react'
import { useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


function Nav() {

  const history = useHistory()
  const isLogged = isAuthenticated()
  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (

    <Navbar sticky='top'>

      <Navbar.Brand href="home">Endless</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="">Home</Nav.Link>
          {!isLogged &&
            <Nav.Link href="login">Log in</Nav.Link>
          }
          {!isLogged &&
            <Nav.Link href="register">Register</Nav.Link>
          }
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            {isLogged &&
              <NavDropdown.Item href="new_dream">New Dream</NavDropdown.Item>
            }
            {isLogged &&
              <NavDropdown.Item href="users">Dreamers</NavDropdown.Item>
            }
            <NavDropdown.Item href="dreams">Dream Stream</NavDropdown.Item>
            <NavDropdown.Item href="categories">Categories</NavDropdown.Item>
            <NavDropdown.Item href="about">About</NavDropdown.Item>
            <NavDropdown.Divider />
            {isLogged &&
              <NavDropdown.Item href="" onClick={handleLogout}>Sign out</NavDropdown.Item>
            }
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Go</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav
