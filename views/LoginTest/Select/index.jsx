import React from 'react'
export let Select = React.createClass({
  onChange(){
    this.props.onChange(this.refs.select.value)
  },

  render(){
    const select=this.props.options.map((item,key)=> {
      return <option key={key} value={item.value}>{item.children}</option>
    })
    return (
      <select defaultValue={this.props.defaultValue} onChange={this.onChange} ref='select'>
        {select}
      </select>
    )
  }
})
