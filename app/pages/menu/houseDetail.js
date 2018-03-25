import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect((state, props) => ({}))
export default class app extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props);
  }
  render() {
    const { params } = this.props;
    return (
      <div>
        <h2>第{params.detailId}条详情</h2>
      </div>
    )
  }
}
