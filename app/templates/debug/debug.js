import Argon from 'argon'

var socket = io({transports: ['websocket']})

Argon.managerPort.output.pipe(function(type, event) {
  socket.emit('fromRemote', {type:type, event:event})
})

socket.on('toRemote', function(data) {
  if (data.type !== 'unload') // ignore unload events
    Argon.managerPort.trigger(data.type, data.event)
})

socket.on('connect', function() {
  Argon.immersiveContext.background.getJSON().then(function(json) {
    socket.emit('fromRemote', {
      type:'setBackground',
      event: json
    })
  })
})
