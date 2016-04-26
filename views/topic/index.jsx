import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
// require('./style')

const Topic=React.createClass({
  getInitialState(){
    return {
      user:this.props.params.itemId
    }
  },
  // conponentDitMount(){
  //   this.setState({
  //     user:this.props.params.itemId

  //   })
  // //   console.log(user)
  // },
  render(){
    return (<div>{this.state.user}</div>)
  }
})
export default Topic;
