import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect((state, props) => ({}))
export default class welcome extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props);
    this.state = {
      user: JSON.parse(sessionStorage.getItem('staff')),
    }
  }
  render() {
    return (
      <div className="welcome">
        <div className="content">
          <h2 className="title">{this.state.user.username}，欢迎你！</h2>
        </div>
      </div>
    )
  }
}
