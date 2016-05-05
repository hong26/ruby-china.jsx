import React from 'react'
import { Link } from 'react-router'
import Loaders from '../Loaders'
import {locales} from '../../settings'

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
      <div className='media container'>
        <div className='media-left media-middle user-div'><img src={user.avatar_url} className='media-object img-rounded img-by'/>
        <span>{user.login}</span>
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
            <p><span>发表主题：</span><a>{user.topics_count}</a></p>
            <p><span>收藏帖子：</span><a>{user.favorites_count}</a></p>
          </div>
        </div>
      </div>
      )
  }
})
