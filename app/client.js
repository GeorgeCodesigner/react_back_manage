import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './config'
import Routes from './routes'
import configure from './store/configureStore'
// global.gconfig是初始状态
const store = configure({ config: global.gconfig });
// react-redux的Provider组件在根组件（Routes组件）外面包了一层，使得Routes的所有子组件都可以拿到store里面的state
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
