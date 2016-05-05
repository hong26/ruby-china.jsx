import React from 'react'
import {
  Link,
  IndexLink
} from 'react-router'

import {locales} from '../../settings'
require('./style')

module.exports = React.createClass({
  render() {
    return <nav className="navbar navbar-light navbar-fixed-top bg-faded">
      <IndexLink to="/" className="navbar-brand">Ruby China</IndexLink>
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <a href="/topics/1" className='nav-link'>{locales.zh_CN.latest}</a>
        </li>
        <li className="nav-item">
          <Link to="/search" className="nav-link">{locales.zh_CN.search}</Link>
        </li>
      </ul>
      {
        this.props.authorizedUser.login ? (() => {
          return <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to={`/me/${this.props.authorizedUser.name}`} className="nav-link">{this.props.authorizedUser.name}</Link>
            </li>
            <li className="nav-item">
              <a href="/logout" className="nav-link" onClick={(e) => {
                e.preventDefault()
                localStorage.clear()
                window.location = '/'
              }}>{locales.zh_CN.logout}</a>
            </li>
          </ul>
        })() : (() => {
          return <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a href="https://ruby-china.org/account/sign_in" target="_blank" className="nav-link">{locales.zh_CN.sign_up}</a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">{locales.zh_CN.login}</Link>
            </li>
          </ul>
        })()
      }
    </nav>
  }
})
