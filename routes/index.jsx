import React from 'react'
import {
  Route,
  Router,
  IndexRoute,
  browserHistory
} from 'react-router'

import NotFound from '../views/404'
import Application from '../views/app'
import Login from '../views/Login'
import Topics from '../views/Topics'
import Topic from '../views/Topic'
import Users from '../views/Users'
import Meuser from '../views/Meuser'
import Test from '../views/Test'
import LoginTest from '../views/LoginTest'

module.exports = () => {
  return <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <Route path='/test' component={Test} />
      <Route path='/logintest' component={LoginTest} />
    </Route>
  </Router>
}
