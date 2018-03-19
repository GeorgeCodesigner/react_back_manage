import {
  routerReducer as routing, // 管理路由的状态更新
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

// tabList
import tabListResult from './tabList'
// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
} from './house'
// common
import {
  loginResponse,
} from './common'

// 将子Reducer函数合成大的Reducer
const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  tabListResult,
  loginResponse,
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
});

export default rootReducer;
