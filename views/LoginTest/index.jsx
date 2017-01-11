import React from 'react'
import {Login} from 'my-app'
import 'my-app/Styles/login.css'
let LoginTest = React.createClass({
  onBox1(){
    console.log('1')
    this.refs.box1.showPopUp()
  },

  onBox2(){
    console.log('2')
    this.refs.box2.showPopUp()
  },
  render(){
    return (
      <div>
  <Login
    name="请输入用户名"
    password="请输入密码"
    size={400}
    radius={0}
    remenber='block'
    forgetPassword='忘记密码'
    signIn='去注册'
    forgetPasswordLink='#'
    signInLink='#'
  />
      </div>
    )
  }
})

export default LoginTest
