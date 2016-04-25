import React from 'react'
import {locales} from '../../settings'
import {RUBY_CHINA_API_URL} from '../../constants'

module.exports = React.createClass({
  getInitialState() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  componentDidMount() {
    document.title = locales.zh_CN.login
  },
  handleSubmit(event) {
    event.preventDefault()
  },
  handleChange(event) {
    const login = this.state.login
    login[event.target.name] = event.target.value

    this.setState({
      login: login
    })
  },
  render() {
    return <div className="container">
      <form accept-charset="UTF-8" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">{locales.zh_CN.username}</label>
          <input type="text" name="username" value={this.state.login.username} className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">{locales.zh_CN.password}</label>
          <input type="password" name="password" value={this.state.login.password} className="form-control" onChange={this.handleChange} />
        </div>
        <button className="btn btn-primary">{locales.zh_CN.login}</button>
      </form>
    </div>
  }
})
