var
  express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http)


const PORT = process.env.PORT || 3000

// TODO Mongo connect

// TODO Declare message model

app.use(express.static(__dirname))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
  socket.on('connect message', function (user){
    io.emit('push message', {username: "Chatbot", text: user + " connected..."})
  })
  socket.on('chat message', function(msg) {
    // TODO Link in a mongo object here
    // message.create({msg})
    io.emit('push message', msg)
    console.log('message: ', msg)
  })
})

// io.on('connection', function(socket) {
//     console.log("someone connected")
//     io.emit('connection message', "A new user connected")
// })

http.listen(PORT, function() {
  console.log('listening on port', PORT)
})
