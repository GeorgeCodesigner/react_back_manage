import React from 'react'
// Router是保持UI和URL的同步的组件；Route是用于声明路由映射到应用程序的组件层；当用户在父route的URL时，IndexRoute允许你为父route提供一个默认的"child"
import { Router, Route, IndexRoute } from 'react-router'
import hashHistory from './middleware/history/history' // Router监听的 history 对象

import App from './base'
import Welcome from './pages/welcome'
// require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// location在这里进行配置，后面base/index.js中会用到
// 表格列表
const table = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/menu/table').default)
  }, 'table')
}

// 图表
const echarts = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/menu/echarts').default)
  }, 'echarts')
}

// 登录
const Login = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/login').default)
  }, 'login')
}

// 注册
const Register = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/register').default)
  }, 'register')
}

// 测试
const chat = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/chat').default)
  }, 'chat')
}

// 编辑器
const editor = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/menu/editor').default)
  }, 'editor')
}

/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token');
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}
// getComponent是异步的，回调函数中执行查找组件等操作；onEnter在route即将进入时调用,nextState是下一个路由的state，replaceState重定向到另一个路径
export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/table" getComponent={table} />
      <Route path="/echarts" getComponent={echarts} />
      <Route path="/editor" getComponent={editor} />
      <Route path="/chat" getComponent={chat} />
    </Route>
    <Route path="/login" getComponent={Login} />
    <Route path="/register" getComponent={Register} />
  </Router>
)

// export default routes
