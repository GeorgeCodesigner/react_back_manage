import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, router, reduxRouterMiddleware } from '../middleware'
import rootReducer from '../reducers'

const nextReducer = require('../reducers')

export default function configure(initialState) {
  // console.log('initialState', initialState);
  // 初步生成store:如果在全局安装devToolsExtension插件，则用该插件创建执行createStore
  const create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;
  // 中间件用法
  const createStoreWithMiddleware = applyMiddleware(
    // 这些都是中间件
    reduxRouterMiddleware, // hashHistory路由切换方式中间件
    thunkMiddleware, //
    logger, // 打印日志功能注释了，现在只有返回下一个action的功能
    router, // 正常路由切换方式中间件
  )(create);
  // 传入reducer，完成store的创建
  const store = createStoreWithMiddleware(rootReducer, initialState);
  // 热加载,及时跟新reducer
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
