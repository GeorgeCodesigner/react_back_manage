import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
// browserHistory设置使得路由按照正常路径（如：example.com/some/path）方式切换，其背后调用但是浏览器的History API
export default routerMiddleware(browserHistory);
