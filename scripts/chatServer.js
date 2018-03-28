let express = require('express'), // 使用express框架
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server), // socket.io的服务端
  users = [];
// specify the html we will use
// app.use('/', express.static(__dirname + '/www'));
// bind the server to the 80 port
// server.listen(3000);//for local test
server.listen(process.env.PORT || 3333);// publish to heroku
// server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
// console.log('server started on port'+process.env.PORT || 3000);
// handle the socket
io.sockets.on('connection', function (socket) {
  // new user login
  socket.on('login', function (nickname) {
    console.log(nickname);
    console.log(users);
    if (users.indexOf(nickname) > -1 && nickname!==null) {
      socket.emit('nickExisted', nickname, users);
    } else {
        // socket.userIndex = users.length;
      socket.nickname = nickname;
      users.push(nickname);
      socket.emit('loginSuccess', '登录成功');
      io.sockets.emit('system', nickname, users, 'login');
    }
  });
  // user leaves
  socket.on('disconnect', function () {
    if (socket.nickname != null) {
        // users.splice(socket.userIndex, 1);
      users.splice(users.indexOf(socket.nickname), 1);
      socket.broadcast.emit('system', socket.nickname, users, 'logout');
    }
  });
  // new message get
  socket.on('postMsg', function (msg, color) {
    console.log(msg);
    socket.broadcast.emit('newMsg', socket.nickname, msg, color); // 告诉客户端有新的消息
  });
  // new image get
  socket.on('img', function (imgData, color) {
    socket.broadcast.emit('newImg', socket.nickname, imgData, color);
  });
});
