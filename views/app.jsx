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

    let xmlhttp = null
    if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest
    }
    else if(window.ActiveXObject){
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }
    if(xmlhttp != null){
      xmlhttp.open('GET', RUBY_CHINA_API_V3_URL + '/users/me?access_token=' + this.state.accessToken, false)
      xmlhttp.send(null)
      let myuser = JSON.parse(xmlhttp.response)
      if(myuser.user){
        this.setState({
        authorizedUser: myuser.user
        })
      }
    }
    })

    //   fetch(RUBY_CHINA_API_V3_URL + '/users/me?access_token=' + this.state.accessToken).then((response) => response.json()).then((responseJSON) => {
    //     if (responseJSON.user) {
    //       this.setState({
    //         authorizedUser: responseJSON.user
    //       })
    //     }
    //   })
    // })
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
