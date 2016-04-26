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
import Topics from '../views/topics'
import Topic from '../views/topic'

module.exports = () => {
  return <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Topics} />
      <Route path="login" component={Login} />
      <Route path='/topics/:item' component={Topics} />
      <Route path='/topic/:itemId' component={Topic} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
}
