import React from 'react'
import Navbar from './Navbar'

module.exports = React.createClass({
  render() {
    return <div className="app">
      <Navbar />
      {this.props.children}
    </div>
  }
})
