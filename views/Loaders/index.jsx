import React from 'react'
require('./style.sass')

module.exports = React.createClass({
  render() {
    return <div className='loaders'>
      <div className='loader text-xs-center'>
        <div className='loader-inner ball-pulse-rise'>
          <div style={this.props.style}></div>
          <div style={this.props.style}></div>
          <div style={this.props.style}></div>
          <div style={this.props.style}></div>
          <div style={this.props.style}></div>
        </div>
      </div>
    </div>
  }
})
