import React from 'react'
import { Link } from 'react-router'
import Loaders from '../Loaders'
import {locales} from '../../settings'
import Usertopics from '../Usertopics'
require('./style.sass')

module.exports = React.createClass({
  getInitialState(){
    return {
      login: this.props.params.login,
      user: [],
      done: false,
      topic: false
    }
  },

  componentDidMount(){
    this.personalDetails(this.state.login)
    document.title = locales.zh_CN.users
  },



  personalDetails(user){
    let xmlhttp
    xmlhttp=null
    if (window.XMLHttpRequest)
      {// 支持  IE7, Firefox, Opera, etc.
      xmlhttp=new XMLHttpRequest();
      }
    else if (window.ActiveXObject)
      {// 支持  IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

    if (xmlhttp!=null)
      {
      xmlhttp.open("GET",'https://ruby-china.org/api/v3/users/'+user,false);
      xmlhttp.send(null);
      let userkey=JSON.parse(xmlhttp.response)
      // console.log(userkey)
      if(userkey.user){
        this.setState({
          user:userkey.user
        })
      }
      else{
        window.location = '/users/404'
      }
      }
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

  follow(event){
    let accessToken=localStorage.getItem('access_token')
    if(accessToken===null){
      alert('您还没有登陆呢,请登陆后再操作!')
      window.location = '/login'
    }
    // fetch('https://ruby-china.org/api/v3/users/'+this.state.user.login+'/follow\?access_token='+accessToken,{method: 'POST'}).then((response) => response.json()).then(json => console.log(json))
    // alert('关注成功')
    let xmlhttp = null
    if (window.XMLHttpRequest)
      {// 支持  IE7, Firefox, Opera, etc.
      xmlhttp=new XMLHttpRequest();
      }
    else if (window.ActiveXObject)
      {// 支持  IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    if(xmlhttp!=null){
      xmlhttp.open('POST', 'https://ruby-china.org/api/v3/users/'+this.state.user.login+'/follow?access_token='+accessToken, false)
      xmlhttp.send(null)
      let followkey=JSON.parse(xmlhttp.response)
      if(followkey.ok===1){
        alert('关注成功')
    }else{
      alert('关注失败')
    }
    }
  },

  unfollow(event){
    let accessToken=localStorage.getItem('access_token')
    if(accessToken===null){
      alert('您还没有登陆呢,请登陆后再操作!')
      window.location = '/login'
    }
    let xmlhttp = null
    if (window.XMLHttpRequest)
      {// 支持  IE7, Firefox, Opera, etc.
      xmlhttp=new XMLHttpRequest();
      }
    else if (window.ActiveXObject)
      {// 支持  IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    if(xmlhttp!=null){
      xmlhttp.open('POST', 'https://ruby-china.org/api/v3/users/'+this.state.user.login+'/unfollow?access_token='+accessToken, false)
      xmlhttp.send(null)
      let followkey=JSON.parse(xmlhttp.response)
      if(followkey.ok===1){
        alert('取消关注成功')
    }else{
      alert('取消关注失败')
    }
    }
  },

  topicClick(event){
    this.setState({
      done:!this.state.done,
      topic:!this.state.topic
    })
  },

  render(){
    let user=this.state.user
    if(this.state.done==false){
    return (
      <div className='media container'>
        <div className='media-left media-middle user-div'><img src={user.avatar_url} className='media-object img-rounded img-by'/>
        <span>{user.login}</span>
        <div><button onClick={this.follow} className="btn btn-success-outline btn-sm">关注</button><button onClick={this.unfollow} className="btn btn-success-outline btn-sm">取消关注</button></div>
        </div>
        <div className='media-body body-user'>
          <h2　className='media-heading'>个人信息</h2>
          <div>
            <p><span>用户名:</span>{user.login}</p>
            <p><span>注册时间:</span>{this.dateStatistics(user.created_at)}</p>
             <p><span>昵称:</span>{user.name? user.name:'本人行不更名坐不改姓！'}</p>
            <p><span>所在地:</span>{user.location? user.location:'未知'}</p>
            <p><span>公司:</span>{user.company? user.company:'未知'}</p>
            <p><span>Twitter:</span>{user.twitter? user.twitter:'未知'}</p>
            <p><span>网站:</span><a href={user.website}>{user.website}</a></p>
            <p><span>github:</span><a href={user.github?'https://github.com/'+user.github:''}>{user.github? user.github:'未知'}</a></p>
            <p><span>email:</span>{user.email? user.email:'未知'}</p>
            <p><span>座右铭：</span>{user.tagline? user.tagline:'还没有想好呢！'}</p>
            <p><span>发表主题：</span><a onClick={this.topicClick}>{user.topics_count}</a></p>
            <p><span>收藏帖子：</span><a>{user.favorites_count}</a></p>
          </div>
        </div>
      </div>
    )
  }
if(this.state.done==true && this.state.topic==true){
  return <Usertopics done={this.state.done} onclick={this.topicClick} topics={user.topics_count}/>
}
}
})



