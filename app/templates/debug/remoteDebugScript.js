if (ARGON.isArgonAppEnvironment === false &&
    ARGON.isDesktopWebEnvironment === true) {

  var socket = io({transports: ['websocket']})

  socket.on('connect', function() {
    ARGON.init() // TODO: ARGON.init(['Vuforia'])
  })

  socket.on('toChannel', function(data) {
    ARGON.managerPort.output.emit(data.type, data.event)
  })

  ARGON.managerPort.input.pipe( function(type, event) {
    socket.emit('fromChannel', {type:type, event:event})
  })

}
