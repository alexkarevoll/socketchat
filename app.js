angular.module('socketChat', [])
  .controller('MainController', MainController)


  function MainController(){
    var vm = this
    var socket = io()
    vm.title = "Socket Chat"
    vm.description = "A website for Alex to prove his angular/socket.io skills"

    vm.messages = [
      {_id: '1', username: 'Ric', text: 'Hey there Morty'},
      {_id: '2', username: 'Morty', text: 'Hey there Granpa Ric, w-w-w-whats up?'},
      {_id: '3', username: 'Ric', text: 'What is this Morty the 90s?'},
    ]

    // allows new messages to be made on the input
    vm.newMessage = {}

    // this will happen in the html through ng-click
    vm.addMessage = function(){
      console.log("Adding Message to Array")
      // pushes new message into the message array
      // vm.messages.push(vm.newMessage)
      // emit socket event
      socket.emit('chat message', vm.newMessage.text)
      // clears input after adding
      vm.newMessage = {}
      // prevent refresh
      return false
    }

    // listen for socket emits
    socket.on('chat message', function(msg) {
      vm.messages.push(msg)
    })
  }
