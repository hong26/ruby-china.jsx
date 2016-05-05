import React from 'react'
import Navbar from './Navbar'
import Meuser from './Meuser'
import {RUBY_CHINA_API_V3_URL} from '../constants'
import Topics from './topics'

module.exports = React.createClass({
  getInitialState() {
    return {
      accessToken: null,
      authorizedUser: {}
    }
  },
  componentDidMount() {
    this.setAuthorizedUser()
  },
  setAuthorizedUser() {
    this.setState({
      accessToken: localStorage.getItem('access_token')
    }, () => {
      if (this.state.accessToken == null) {
        return false
      }

      fetch(RUBY_CHINA_API_V3_URL + '/users/me?access_token=' + this.state.accessToken).then((response) => response.json()).then((responseJSON) => {
        if (responseJSON.user) {
          this.setState({
            authorizedUser: responseJSON.user
          })
        }
      })
    })
  },
  render() {
    return <div className="app">
      <Navbar authorizedUser={this.state.authorizedUser} />
      {
        React.Children.map(this.props.children, (e) => {
          return React.cloneElement(e, {
            accessToken: this.state.accessToken,
            setAuthorizedUser: this.setAuthorizedUser
          })
        })
      }
    </div>
  }
})
