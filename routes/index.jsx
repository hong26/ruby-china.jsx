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
import Home from '../views/Home'

module.exports = () => {
  return <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
}
