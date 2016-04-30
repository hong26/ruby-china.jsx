import React from 'react'
import { Link } from 'react-router'
import Loaders from '../Loaders'
import {locales} from '../../settings'

module.exports = React.createClass({
  getInitialState(){
    return {
      login: this.props.params.login,
      user: []
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
      this.setState({
        user:userkey.user
      })
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
    let user=this.state.user
    return (
      <div className='media container'>
        <div className='media-left media-middle'><img src={user.avatar_url} className='media-object'/>
        <span>{user.login}（{user.name}）</span></div>
        <div className='media-body'>
          <h2　className='media-heading'>个人信息</h2>
          <div>
            <p><span>用户名:</span>{user.login}</p>
            <p><span>注册时间:</span>{this.dateStatistics(user.created_at)}</p>
             <p><span>昵称:{user.name? user.name:'本人行不更名坐不改姓！'}</span></p>
            <p><span>所在地:</span>{user.location? user.location:'经纬度哪能随便让你知道！'}</p>
            <p><span>公司:</span>{user.company? user.company:'这家伙太懒了,居然不填！'}</p>
            <p><span>Twitter:</span>{user.twitter? user.twitter:'推特是什么，可以吃吗？'}</p>
            <p><span>网站:</span><a href={user.website}>{user.website}</a></p>
            <p><span>github:</span>{user.github? user.github:'未知'}</p>
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



