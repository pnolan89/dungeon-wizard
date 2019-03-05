import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'
import Campaign from './campaign'

class App extends Component {
  render () {
    return <Router>
      <Switch>
       <Route exact path='/' exact component={Home} />
       <Route path='/campaigns'component={Home} />
       {/* <Route path='/campaigns/:campaignId' exact component={Home} /> */}
       <Route path='/users/:userId' exact component={Home} />
       <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App
