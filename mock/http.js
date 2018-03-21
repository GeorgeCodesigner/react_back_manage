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
      postData = JSON.parse(postData);
      console.log("postData:"+JSON.stringify(postData));
      const originData = _map[req.url]
        ? Mock.mock(_map[req.url])
        : '';
      const data = typeof (_filter[req.url]) === 'function'
        ? _filter[req.url](originData, postData)
        : originData;

      if (data.status === 1) {
        if(data.hasOwnProperty("data")){
          if(data.data.hasOwnProperty("token")){
            data.msg = '获取用户token成功';
            data.data.username = postData.username;
          }
        }else{
          if(data.type==="login"){
            data.msg = '登录成功';
          }else if(data.type==="register"){
              data.msg = '注册成功';
          }
        }
      }else if (data.status === 0) {
        if(data.hasOwnProperty("data")){
          if(data.data.hasOwnProperty("token")){
            data.msg = '获取用户token失败';
          }
        }else{
          if(data.type==="login"){
              data.msg = '登录失败';
          }else if(data.type==="register"){
              data.msg = '注册失败';
          }
        }
      }
      console.log("resData:"+JSON.stringify(data));
      res.end(JSON.stringify(data));
    })
  }
}).listen(1111)
console.log('正在监听1111端口')
