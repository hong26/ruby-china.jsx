import React from 'react'
import {Link} from 'react-router'
import Loaders from '../Loaders'
require('./style')

const Topic=React.createClass({
  getInitialState(){
    return {
      topic:'',
      replies:[]
    }
  },
  componentDidMount(){
     // 获取网页信息旧写法,基本所有浏览器都可以支持
    this.loadXMLDoc('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId)
    this.repLies('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId+'/replies')
    document.documentElement.scrollTop = document.body.scrollTop = 0

   // 获取网页信息新写法(fetch),有些浏览器不支持
    // fetch('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId).then((response)=>{
    //   return response.json()
    // }).then((json)=>{
    //   this.setState({
    //     topic:json.topic
    //   })
    // })

    //     fetch('https://ruby-china.org/api/v3/topics/'+this.props.params.itemId+'/replies').then((response)=>{
    //   return response.json()
    // }).then((json)=>{
    //   this.setState({
    //     replies:json.replies
    //   })
    // })
  },

  // 获取网页信息旧写法,基本所有浏览器都可以支持
  loadXMLDoc(url){
    let xmlhttp
    xmlhttp=null
    if (window.XMLHttpRequest)
      {//支持 IE7, Firefox, Opera, etc.
      xmlhttp=new XMLHttpRequest();
      }
    else if (window.ActiveXObject)
      {// 支持 IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

    if (xmlhttp!=null)
      {
      xmlhttp.open("GET",url,false);
      xmlhttp.send(null);
      let topickey=JSON.parse(xmlhttp.response)
      if(topickey.topic){
        this.setState({
          topic:topickey.topic
        })
      }
      else{
        window.location='/404'
      }
      }
  },

    repLies(url){
    let xmlhttp
    xmlhttp=null
    if (window.XMLHttpRequest)
      {// code for IE7, Firefox, Opera, etc.
      xmlhttp=new XMLHttpRequest();
      }
    else if (window.ActiveXObject)
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

    if (xmlhttp!=null)
      {
      xmlhttp.open("GET",url,false);
      xmlhttp.send(null);
      let topickey=JSON.parse(xmlhttp.response)
      this.setState({
        replies:topickey.replies
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
      let topic=this.state.topic
      let replies=this.state.replies
      if(topic==0){
        return (<div className='container by-container'><Loaders style={{backgroundColor: 'lightgray'}} /></div>)
      }
      else if(replies==0){
        return (<div className='container'>
        <h1>{topic.title}</h1>
          <p className='font-style by-size'>
            <span className='lebel-ctm'>由<Link to={`/${topic.user.login}`}> {topic.user.login} </Link>创建于:{this.dateStatistics(topic.created_at)}</span>
            <span className='lebel-ctm'>最后更新:{this.dateStatistics(topic.updated_at)}</span>
            <span className='lebel-ctm'>浏览数:{topic.hits}</span>
            <span className='lebel-ctm'>回复:{topic.replies_count}</span>
          </p>
          <p><Link to={`/${topic.user.login}`} className='media-left'> <img src={topic.user.avatar_url} className=' img-rounded img-ctm'/></Link>
          <Link to={`/${topic.user.login}`}>{topic.user.login}</Link></p>
        <div dangerouslySetInnerHTML={{__html: topic.body_html}} className='content-block'/>
            <h4 className='media-hctm'>暂无回复</h4>
          </div>
        )
      }
      else{
      return (<div className='container'>
        <h1>{topic.title}</h1>
          <p className='font-style by-size'>
            <span className='lebel-ctm'>由<Link to={`/${topic.user.login}`}> {topic.user.login} </Link>创建于:{this.dateStatistics(topic.created_at)}</span>
            <span className='lebel-ctm'>最后更新:{this.dateStatistics(topic.updated_at)}</span>
            <span className='lebel-ctm'>浏览数:{topic.hits}</span>
            <span className='lebel-ctm'>回复:{topic.replies_count}</span>
          </p>
          <p><Link to={`/${topic.user.login}`} className='media-left'> <img src={topic.user.avatar_url} className=' img-rounded img-ctm'/></Link>
          <Link to={`/${topic.user.login}`}>{topic.user.login}</Link></p>
        <div dangerouslySetInnerHTML={{__html: topic.body_html}} className='content-block'/>
        <div className='media-body media-divctm'><h4 className='media-heading'>回复列表:</h4>
        {replies.map((rep,id)=>{
        return (
          <div key={id} className='media-pctm'>
          <p className='reply-style'>发表于:{this.dateStatistics(rep.created_at)}</p>
          <p className='media-spanctm'>{id+1}楼</p>
          <Link to={`/${rep.user.login}`} className='media-left'> <img src={rep.user.avatar_url} className=' img-rounded img-ctm'/></Link>
          <Link to={`/${rep.user.login}`}>{rep.user.login}</Link>
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
