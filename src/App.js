import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import About from './components/common/About'
import Error from './components/common/Error'
import AllDreams from './components/dreams/AllDreams'
import SingleDream from './components/dreams/SingleDream'
import Categories from './components/common/Categories'
import NewDream from './components/dreams/NewDream'
import Users from './components/common/Users'
import SecureRoute from './components/common/SecureRoute'
import EditDream from './components/dreams/EditDream'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>

        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />


        <Route path="/categories" component={Categories} />
        <Route path="/users" component={Users} />


        <Route path="/dreams" component={AllDreams} />
        <Route path="/dreams/:dreamId" component={SingleDream} />

        <SecureRoute Route path="/new_dream" component={NewDream} />
        <SecureRoute Route path="/dreams/:dreamId/edit" component={EditDream} />

        <Route path="/*" component={Error} />
      </Switch>
    </Router>

  )
}

export default App
