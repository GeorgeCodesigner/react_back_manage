import {
  createAction,
} from 'redux-actions'
import {
  common,
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction, // 没有这个
} from 'utils'

export const fetchLogin = createAjaxAction(common.login);
export const fetchRegister = createAjaxAction(common.register);
export const userInfo = createAjaxAction(common.userInfo);

