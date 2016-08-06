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

module.exports = () => {
  return <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Topics} />
      <Route path="login" component={Login} />
      <Route path='/topics/:item' component={Topics} />
      <Route path='/topic/:itemId' component={Topic} />
      <Route path='/:login' component={Users} />
      <Route path='/me/:id' component={Meuser} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
}
