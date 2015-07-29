import Argon from 'argon'

if (Argon.Platform.isRunningInArgonApp === false &&
    Argon.Platform.isRunningInDesktopBrowser === true) {

  var socket = io({transports: ['websocket']})

  socket.on('connect', function() {
    console.log("Connected to Argon app!")
  })

  socket.on('toChannel', function(data) {
    Argon.managerPort.output.emit(data.type, data.event)
  })

  Argon.managerPort.input.pipe( function(type, event) {
    socket.emit('fromChannel', {type:type, event:event})
  })

}
