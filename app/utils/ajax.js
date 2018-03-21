// ajax post具体实现方法
import fetch from 'isomorphic-fetch'
import axios from 'axios' // 基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中
import { prefix, suffix, timeout } from '../config'

// axios基础配置
const axiosBaseConfig = {
  // baseURL: prefix,
  // 如果请求花费的时间超过延迟的时间，那么请求会被终止
  timeout: timeout,
  // headers选项是需要被发送的自定义请求头信息
  headers: { 'Content-Type': 'text/plain' },
  method: 'post',
  // 跨域请求，是否带上认证信息
  withCredentials: true, // default
  // http返回的数据类型
  // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // http请求返回状态码检查
  validateStatus: status =>
    status >= 200 && status < 300, // default
  // 请求数据预处理
  transformRequest: [(data, headers) => {
    // 加入token？
    const token = sessionStorage.getItem('token')
    if (token) {
      data.token = token
    }
    // 请求对象转换成json字符串
    if (typeof data === 'object') {
      return JSON.stringify(data)
    }
    return data
  }],
  // 返回数据预处理，即允许我们在数据传送到`then/catch`方法之前对数据进行改动
  transformResponse: [respData =>
    // 检查返回status值
    // if (typeof respData.status !== 'undefined') {
    //   if (respData.status === 1) {
    //     return respData
    //   }
    //   throw new Error(respData.errMsg || 'respData.status不为0')
    // }
    respData,
  ],
};
// 创建 axios 实例
const axiosInstance = axios.create(axiosBaseConfig);
// 请求拦截器
axiosInstance.interceptors.request.use(
  // 在请求发出之前对请求本身进行的操作
  req => req,
  // 在请求发出之前对请求的错误进行的操作
  error => Promise.reject(error),
);
// 响应拦截器
axiosInstance.interceptors.response.use(
  // 在响应到来之前对返回数据进行的操作
  resp => resp,
  // 在响应到来之前对返回错误进行的操作
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(new Error('请求被取消'))
    }
    if ('code' in error && error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('请求超时'))
    }
    return Promise.reject(error)
  },
);
// 该方法在utils/index.js里面的createAjaxAction里调用
function axiosPost(url, reqData, target, handleCancel) {
  let newUrl;
  if (target) {
    newUrl = `${target}${url}${suffix}`
  } else {
    newUrl = `${prefix}${url}${suffix}`
  }
  // 返回一个promise对象,cancelToken定义用于取消请求的cancel token(如果存在handleCancel，则它是handleCancel的一个方法)
  return axiosInstance.post(newUrl, reqData, {
    cancelToken: handleCancel ? handleCancel.token : undefined,
  })
}
// 执行post请求的函数：管道函数————url, target：api的js文件里调用的方法的参数；reqData, handleCancel:在utils/index.js里面的createAjaxAction里调用时候传的参数
const fetchJSONByPost = (url, target) => (reqData, handleCancel) => axiosPost(url, reqData, target, handleCancel)

export {
  fetchJSONByPost,
  axiosBaseConfig, // 没必要导出
}
