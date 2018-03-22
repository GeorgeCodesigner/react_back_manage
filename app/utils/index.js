import { message } from 'antd'
import { hashHistory } from 'react-router'
import * as ajaxFun from './ajax' // 没这个

export const ajax = ajaxFun;
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
// 生成ajax的action函数：管道函数————httpHandle:common.login;reqData, cb, reject:在pages的js文件里调用时候传的参数
export const createAjaxAction = (httpHandle, startAction, endAction) => (reqData, cb, reject, handleCancel) =>
  (dispatch) => {
    // request start
    startAction && dispatch(startAction());
    // 这里调用的是utils/ajax.js里面的 axiosPost方法
    httpHandle(reqData, handleCancel)
      .then((resp) => {
        endAction && dispatch(endAction({ req: reqData, res: resp.data }))
        // console.log(resp.data);
        return resp.data
      })
      .then((resp) => {
        // console.log(resp);
        switch (resp.status) {
        case 1: // 成功状态
          cb && cb(resp);
          break
        case 0: // 失败状态
        default:
          /*if (resp.status.toString() === '-1') {
            sessionStorage.clear();
            hashHistory.push('/login')
          }*/
          if (reject) {
            reject(resp)
          } else {
            message.error(resp.msg)
          }
          break
        }
      })
      .catch((error) => {
        console.log(error);
        if (reject) {
          reject({ status: 0, msg: error.message })
        } else {
          message.error(error.message)
        }
      })
  }
