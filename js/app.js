
// need to make a factory that imitates socket.io
// so that angular will listen to socket emits
// thanks stack overflow
angular.module('socketChat', [])
  .controller('MainController', MainController)
  .factory('socket', function ($rootScope) {
    var socket = io();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  })

  // inject socket factory that mimics socket io
  MainController.$inject = ['socket']
  function MainController(socket){
    var vm = this
    vm.title = "Socket Chat"

    // allows current user to be made in the input, scopes it to this controller
    vm.currentUser = {}

    // function to be run when users set their username
    vm.newUser = function() {
      vm.currentUser.name = vm.formUser
      // auto focus on message field
      document.getElementById('m').focus()
      socket.emit('connect message', vm.formUser)
    }

    // starter array of message objects
    vm.messages = [
      {_id: '1', username: 'Chatbot', text: "Hello there, and welcome to Socket Chat."},
      {_id: '2', username: 'Chatbot', text: "We're using socket.io and Angular to have a real-time chat"},
      {_id: '3', username: 'Chatbot', text: "Feel free to type away!"},
    ]

    // allows new messages to be made in the input
    vm.newMessage = {}

    // this will happen in the html through ng-click
    vm.addMessage = function(){
      //attaches message to current username
      vm.newMessage.username = vm.currentUser.name
      // emit socket event
      socket.emit('chat message', vm.newMessage)
      // clears message input after adding
      vm.newMessage.text = ''
      // prevent refresh
      return false
    }

    // listen for socket emits
    socket.on('push message', function(msg) {
      console.log(msg)
      vm.messages.push(msg)
    })
    // socket.on('connection message', function(msg) {
    //   vm.messages.push(msg)
    // })
  }
