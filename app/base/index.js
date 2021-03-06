import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message } from 'antd'
import 'style/base.less'

import Header from './header'
import LeftNav from './nav'
import TabList from './tabList'
// connect方法用于从UI组件（下面的Login组件，只负责 UI 的呈现）自动生成容器组件（括号里的方法，负责管理数据和逻辑）
@connect((state, props) => ({}))
export default class App extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props);
    this.state = {
      pageHeight: 0,
      isLeftNavMini: false, // 左侧导航菜单是否mini模式(true是mini模式)
    };
    this.isLeftNavMini = this.isLeftNavMini.bind(this);
  }
  // 组件已经加载到dom中
  componentDidMount() {
    // antd的message组件 的全局配置
    message.config({
      duration: 3,
    })
  }
  // componentWillMount() {
  //   // 初始化左侧菜单是mini模式还是正常模式
  //   if (sessionStorage.getItem('isLeftNavMini') === 'false') {
  //     this.setState({
  //       isLeftNavMini: false,
  //     })
  //   }
  //   if (sessionStorage.getItem('isLeftNavMini') === 'true') {
  //     this.setState({
  //       isLeftNavMini: true,
  //     })
  //   }
  // }

  // 左侧是否mini
  isLeftNavMini(val) {
    this.setState({
      isLeftNavMini: val,
    }, () => {
      // sessionStorage.setItem('isLeftNavMini', val)
    })
  }

  render() {
    const { location, children } = this.props; // location是routes.js中的location,children是routes.js中的子组件(table,echarts,editor,chat)
    return (
      <div id="container" className="effect easeInOutBack mainnav-lg aside-bright">
        <Header />
        <div className="boxed">
          <div className={this.state.isLeftNavMini ? 'boxed boxed-mini' : 'boxed'}>
            <div id="content-container" className="content-container">
              <div id="page-content">
                <TabList />
                {children}
              </div>
            </div>
          </div>
          <LeftNav
            location={location}
            leftNavMode={this.isLeftNavMini}
          />
        </div>
      </div>
    )
  }
}
