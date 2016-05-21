import React from 'react'
import {Link} from 'react-router'
import {locales} from '../../settings'
import Loaders from '../Loaders'

require('./style')

const Topics=React.createClass({
  getInitialState(){
    return {
      topics: '',
      pages:new Array(98),
      digital:this.props.params.item
    }
  },

  componentDidMount() {
    if(this.state.digital===undefined){
        this.paging(1)
    let pages=this.state.pages
      for(let i=0;i<pages.length;i++){
         pages[i]=i+1
    }
    this.setState({pages:pages,digital:1})
    document.title = 'Ruby-China'
    }else{
    this.paging(this.state.digital)
    let pages=this.state.pages
      for(let i=0;i<pages.length;i++){
         pages[i]=i+1
    }
    this.setState({pages:pages})
    document.title = locales.zh_CN.topics}
  },

// 获取网页信息新写法(fetch),有些浏览器不支持
  //  paging(id,event){
  //   fetch('https://ruby-china.org/api/v3/topics.json?type=last_actived&limit=20&offset='+(id-1)*20).then((response)=>{
  //     return response.json()
  //   }).then((json)=>{
  //     this.setState({
  //       topics:json.topics,
  //       digital:id
  //     })
  //   })
  // },

// 获取网页信息旧写法,基本所有浏览器都可以支持
  paging(id,event){
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
      xmlhttp.open("GET",'https://ruby-china.org/api/v3/topics.json?type=last_actived&limit=20&offset='+(id-1)*20,false);
      xmlhttp.send(null);
      let topickey=JSON.parse(xmlhttp.response)
      this.setState({
        topics:topickey.topics,
        digital:id
      })
      // window.location.reload(true)
      // let osTop = document.documentElement.scrollTop || document.body.scrollTop
      document.documentElement.scrollTop = document.body.scrollTop = 0
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



  render() {
    let topics = this.state.topics
    if (topics){
      return(
        <div className='container'>
          <div className='list-group'>{topics.map((item, index) => {
            return(
              <div key={index} className='list-group-item'>
                <h5><Link to={`/topic/${item.id}`}>{item.title}</Link></h5>
                <code className='label-pill pull-xs-right'><a href={'/topic/'+item.id+'/#a-128'}>{item.replies_count}</a></code>
                <Link to={`/${item.user.login}`}><img src={item.user.avatar_url} className='headportrait lebel-ctm'/></Link>
                <Link to={`/${item.user.login}`}><span className='label label-pill label-info lebel-ctm'> 发布者:{item.user.login} </span></Link>
                <Link to={`/${item.user.login}`}><span className='label label-pill label-warning lebel-ctm'> 最新回复:{item.last_reply_user_login? item.last_reply_user_login:'暂无回复'} </span></Link>
                <pre className='font-style'>
                  发布时间:{this.dateStatistics(item.created_at)}
                </pre>
              </div>
              )
          })}
          </div>
          <div>
           <ul className='pagination'>
           <li className={this.state.digital==1?'page-item disabled':'page-item'}><a href='/topics/1' className='page-link'>＜＜</a></li>
           {this.state.pages.map((item,id)=>{
            let digital=this.state.digital-1
            // console.log(digital)
            if(digital===0 && item<digital+8){
            return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            else if(digital===1 && item<digital+7){
            return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            else if(digital===2 && item<digital+6){
            return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            else if(item>digital-3 && item<digital+5 && item>0){
              return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            })}
             <li className='page-item disabled'style={{display:this.state.digital>96 ? 'none':''}}><a href='' className='page-link'>...</a></li>
             <li className={this.state.digital==99?'page-item disabled':'page-item'}><a href='/topics/99' className='page-link'>99</a></li>
             <li className={this.state.digital==100?'page-item disabled':'page-item'}><a href='/topics/100' className='page-link'>100</a></li>
           </ul>
        </div>
      </div>
        )
    }
    return<div className='container by-container'><Loaders style={{backgroundColor: 'lightgray'}} /></div>
  }
})
export default Topics;
