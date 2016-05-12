import React from 'react'

module.exports = React.createClass({
  getInitialState(){
    return {
      done: this.props.done,
      topics: this.props.topics,
      paging: []
    }
  },
  componentDidMount(){
    // console.log(Math.ceil(this.state.topics/20))
    let a=Math.ceil(this.state.topics/20)  //向上取整
    let paging=[]
    for(let i=0;i<a;i++){
      paging.push(i+1)
    }
    this.setState({
      paging: paging
    })
    // console.log(this.state.done)
  },

  handelClick(event){
    this.props.onclick()
  },

  render(){
    let paging=this.state.paging
    //第一页位置
    console.log(paging[0])
    return (
      <div className='container'>
      <h1>敬请期待......</h1>
      <div>
        <h3>帖子总数:{this.state.topics}</h3>
        <h3>分页数:{paging.length}</h3>
        <button onClick={this.handelClick}>返回</button>
      </div>
      </div>)

  }
})
