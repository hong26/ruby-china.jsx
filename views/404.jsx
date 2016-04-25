import React from 'react'
import {locales} from '../settings'

module.exports = React.createClass({
  render() {
    return <div className="container pages-404">
      <h1 className="text-xs-center">404</h1>
      <p className="text-xs-center">{locales.zh_CN.pages_404}</p>
    </div>
  }
})
