import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'
import Campaign from './campaign'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(localStorage);
  }

  render () {
    return <Router>
      <Switch>
       <Route path='/' exact component={Home} />
       <Route path='/campaigns/' exact component={Home} />
       <Route path='/campaigns/new' exact component={Home} />
       <Route path='/campaigns/edit/:campaignID' exact component={Home} />
       <Route path='/campaigns/:campaignID' exact component={Home} />
       <Route path='/users/' exact component={Home} />
       <Route path='/users/new' component={Home} />
       <Route path='/users/edit/:userID' exact component={Home} />
       <Route path='/users/:userId' exact component={Home} />
       <Route path='/login' component={Home} />
       <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App
