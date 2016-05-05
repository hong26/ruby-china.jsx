import React from 'react'
import { Link } from 'react-router'
import Loaders from '../Loaders'
import {locales} from '../../settings'
require('./style.sass')

module.exports = React.createClass({
  getInitialState(){
    return{
      authorizedUser:[]
    }
  },

  componentDidMount(){
    let accessToken=localStorage.getItem('access_token')
    if(accessToken===null){
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
      xmlhttp.open('GET', 'https://ruby-china.org/api/v3/users/me?access_token='+accessToken, false)
      xmlhttp.send(null)
      let myuser = JSON.parse(xmlhttp.response)
      console.log(myuser)
      if(myuser.user){
        this.setState({
        authorizedUser: myuser.user
        })
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
  render(){
    let user = this.state.authorizedUser
    return(
      <div className='container'>
        <div className='user-div'>
          <img src={user.avatar_url} className='img-rounded center-block'/>
          <p>{user.name}</p>
        </div>
        <div className='list-group'>
          <p className='list-group-item'><span className='by-list-title'>用户名:</span><span>{user.login}</span></p>
          <p className='list-group-item'><span>注册时间:</span>{this.dateStatistics(user.created_at)}</p>
          <p className='list-group-item'><span>昵称:</span>{user.name? user.name:'本人行不更名坐不改姓！'}</p>
          <p className='list-group-item'><span>所在地:</span>{user.location? user.location:'未知'}</p>
          <p className='list-group-item'><span>公司:</span>{user.company? user.company:'未知'}</p>
          <p className='list-group-item'><span>Twitter:</span>{user.twitter? user.twitter:'未知'}</p>
          <p className='list-group-item'><span>网站:</span><a href={user.website}>{user.website}</a></p>
          <p className='list-group-item'><span>github:</span><a href={user.github?'https://github.com/'+user.github:''}>{user.github? user.github:'未知'}</a></p>
          <p className='list-group-item'><span>email:</span>{user.email? user.email:'未知'}</p>
          <p className='list-group-item'><span>座右铭：</span>{user.tagline? user.tagline:'还没有想好呢！'}</p>
          <p className='list-group-item'><span>发表主题：</span><a>{user.topics_count}</a></p>
          <p className='list-group-item'><span>收藏帖子：</span><a>{user.favorites_count}</a></p>
        </div>
      </div>
      )
  }
})
