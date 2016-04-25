import React from 'react'
import {
  Link,
  IndexLink
} from 'react-router'

import {locales} from '../../settings'

module.exports = React.createClass({
  render() {
    return <nav className="navbar navbar-light bg-faded">
      <IndexLink to="/" className="navbar-brand">Ruby China</IndexLink>
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/latest" className="nav-link">{locales.zh_CN.latest}</Link>
        </li>
        <li className="nav-item">
          <Link to="/search" className="nav-link">{locales.zh_CN.search}</Link>
        </li>
      </ul>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <a href="https://ruby-china.org/account/sign_in" target="_blank" className="nav-link">{locales.zh_CN.sign_up}</a>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">{locales.zh_CN.login}</Link>
        </li>
      </ul>
    </nav>
  }
})
