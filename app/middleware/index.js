// 中间件（除了thunkMiddleware外）实现方式文件
import { routerMiddleware } from 'react-router-redux'
import logger from './logger'
import router from './router'
import history from './history/history'

// history模块用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。
const reduxRouterMiddleware = routerMiddleware(history);

export {
  reduxRouterMiddleware,
  logger,
  router,
}
