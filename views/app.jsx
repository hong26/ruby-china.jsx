import React from 'react'
import Navbar from './Navbar'
import {RUBY_CHINA_API_V3_URL} from '../constants'

module.exports = React.createClass({
  getInitialState() {
    return {
      authorizedUser: {}
    }
  },
  componentDidMount() {
    this.setAuthorizedUser()
  },
  setAuthorizedUser() {
    const accessToken = localStorage.getItem('access_token')
    const authorizedUser = localStorage.getItem('authorized_user')

    if (accessToken == null) {
      return false
    }

    if (authorizedUser) {
      return this.setState({
        authorizedUser: JSON.parse(authorizedUser)
      })
    }

    fetch(RUBY_CHINA_API_V3_URL + '/users/me?access_token=' + accessToken).then((response) => response.json()).then((responseJSON) => {
      if (responseJSON.user) {
        localStorage.setItem('authorized_user', JSON.stringify(responseJSON.user))
        this.setState({
          authorizedUser: responseJSON.user
        })
      }
    })
  },
  render() {
    return <div className="app">
      <Navbar authorizedUser={this.state.authorizedUser} />
      {this.props.children}
    </div>
  }
})
