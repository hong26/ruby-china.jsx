import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Loaders from '../Loaders'
require('./style')

const Topic=React.createClass({
  getInitialState(){
    return {
      topic:[],
      replies:[]
    }
  },
  componentDidMount(){
    fetch('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId).then((response)=>{
      return response.json()
    }).then((json)=>{
      console.log(json.topic)
      this.setState({
        topic:json.topic
      })
    })

        fetch('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId+'/replies').then((response)=>{
      return response.json()
    }).then((json)=>{
      this.setState({
        replies:json.replies
      })
    })
  },

    dateStatistics(item){
    const newDate=new Date(item)
    const year=newDate.getFullYear()
    const month=newDate.getMonth()+1
    const date=newDate.getDate()
    const hours=newDate.getHours()
    const minutes=newDate.getMinutes()
    const seconds=newDate.getSeconds()
    return (year)+'-'+(month)+'-'+(date)+' '+(hours<10 ? '0'+hours:hours)+':'+(minutes<10 ? '0'+minutes:minutes)+':'+(seconds<10 ? '0'+seconds:seconds)
  },

  render(){
      let topic=this.state.topic
      let replies=this.state.replies
      console.log(replies)
      if(topic==0){
        return (<div className='container by-container'><Loaders style={{backgroundColor: 'lightgray'}} /></div>)
      }
      else if(replies==0){
        return (<div className='container'>
        <h1>{topic.title}</h1>
          <p><a className='media-left'> <img src={topic.user.avatar_url} className=' img-rounded img-ctm'/></a>
          <a>{topic.user.name}</a></p>
        <div dangerouslySetInnerHTML={{__html: topic.body_html}} className='content-block'/>
            <h4 className='media-hctm'>暂无回复</h4>
          </div>
        )
      }
      else{
      return (<div className='container'>
        <h1>{topic.title}</h1>
          <p className='font-style by-size'>
            <span className='lebel-ctm'>由<a> {topic.user.name} </a>创建于:{this.dateStatistics(topic.created_at)}</span>
            <span className='lebel-ctm'>最后更新:{this.dateStatistics(topic.updated_at)}</span>
            <span className='lebel-ctm'>浏览数:{topic.hits}</span>
            <span className='lebel-ctm'>回复:{topic.replies_count}</span>
          </p>
          <p><a className='media-left'> <img src={topic.user.avatar_url} className=' img-rounded img-ctm'/></a>
          <a>{topic.user.name}</a></p>
        <div dangerouslySetInnerHTML={{__html: topic.body_html}} className='content-block'/>
        <div className='media-body media-divctm'><h4 className='media-heading'>回复列表:</h4>
        {replies.map((rep,id)=>{
        return (
          <div key={id} className='media-pctm'>
          <p className='reply-style'>发表于:{this.dateStatistics(rep.created_at)}</p>
          <p className='media-spanctm'>{id+1}楼</p>
          <a className='media-left'> <img src={rep.user.avatar_url} className=' img-rounded img-ctm'/></a>
          <a>{rep.user.name}</a>
          <p dangerouslySetInnerHTML={{__html: rep.body_html}} className="content-block "/>
          </div>
        )
        })
      }
        </div>
        </div>
      )
    }
  }
})
export default Topic;
