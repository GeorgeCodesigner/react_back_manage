const http = require('http')
const _map = require('./interfaceMap')
const _filter = require('./interfaceFilter')
const Mock = require('mockjs')

http.createServer((req, res) => {
  res.writeHead(200, {
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true
  })
  if (req.method === 'OPTIONS') {
    res.end(null)
  }
  if (req.method === 'POST') {
    let postData = '';
    req.addListener('data', (dataBuffer) => postData += dataBuffer);
    req.addListener('end', () => {
      postData = JSON.parse(postData)
      const originData = _map[req.url]
        ? Mock.mock(_map[req.url])
        : '';
      const data = typeof (_filter[req.url]) === 'function'
        ? _filter[req.url](originData, postData)
        : originData;
      //判断登录
      if (data.status === 1 && data.data.token) {
        data.msg = '登录成功'
      }else if (data.status === 0 && data.data.token) {
        data.msg = '登录失败'
      }
      //判断获取tablist的数据

      console.log("resData:"+JSON.stringify(data));
      res.end(JSON.stringify(data));
    })
  }
}).listen(1111)
console.log('正在监听1111端口')
