import React from 'react'
import {Link} from 'react-router'
import {locales} from '../../settings'

require('./styles')

module.exports = React.createClass({
  getInitialState() {
    return {
      topics: []
    }
  },
  componentDidMount() {
    this.fetchTopics()
  },
  fetchTopics(options={}) {
    fetch(this.props.source).then((response) => response.json()).then((responseJSON) => {
      if (responseJSON.topics) {
        this.setState({
          topics: responseJSON.topics
        })
      }
    })
  },
  render() {
    return <table className="table topics-table">
      <tbody>
        {
          this.state.topics.map((topic) => {
            return <tr key={topic.id}>
              <td>
                <Link to={`/${topic.user.login}`}>
                  <img src={topic.user.avatar_url} className="img-circle" />
                </Link>
              </td>
              <td>
                <Link to={`/topics/${topic.id}`}>{topic.title}</Link>
              </td>
              <td>{topic.node_name}</td>
              <td className="text-xs-center">
                <code>{topic.replies_count}</code>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  }
})
