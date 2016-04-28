import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Loaders from '../Loaders'
// require('./style')

const Topic=React.createClass({
  getInitialState(){
    return {
      topic:[]
    }
  },
  componentDidMount(){
    fetch('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId).then((response)=>{
      return response.json()
    }).then((json)=>{
      console.log(json)
      this.setState({
        topic:json.topic
      })
    })
  },

  render(){
      let topic=this.state.topic
      if(topic==0){
        return <div className='container by-container'><Loaders style={{backgroundColor: 'lightgray'}} /></div>
      }else{
      return (<div className='container'>
        <h3>{topic.title}</h3>
        <div dangerouslySetInnerHTML={{__html: topic.body_html}} /></div>
      )
    }
  }
})
export default Topic;
