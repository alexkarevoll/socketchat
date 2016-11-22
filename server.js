var
  express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http)

const PORT = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
  console.log("someone connected")
  socket.on('chat message', function(msg) {
    io.emit('push message', msg)
    console.log('message: ', msg)
  })
})

http.listen(PORT, function() {
  console.log('listening on port', PORT)
})
