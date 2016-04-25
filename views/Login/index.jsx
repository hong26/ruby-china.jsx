import React from 'react'

module.exports = React.createClass({
  getInitialState() {
    return {
      login: {}
    }
  },
  render() {
    return <div className="container">
      <form accept-charset="UTF-8">
        <div className="form-group">
          <label htmlFor="username"></label>
          <input type="text" name="username" value={this.state.login.username} className="form-control" />
        </div>
      </form>
    </div>
  }
})
