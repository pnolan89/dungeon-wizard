import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'
import Campaign from './campaign'

class App extends Component {
  render () {
    return <Router>
      <Switch>
        <Route path='/' exact component={Home} />
       <Route path='/campaigns/' exact component={Home} />
       <Route path='/campaigns/new' exact component={Home} />
       <Route path='/campaigns/:campaignId' exact component={Home} />
       <Route path='/users/' exact component={Home} />
       <Route path='/users/:userId' exact component={Home} />
       <Route path='/register' component={Home} />
       <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App
