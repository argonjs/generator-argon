import ARGON from 'argon'

var socket = io({transports: ['websocket']})

ARGON.managerPort.output.pipe(function(type, event) {
  socket.emit('fromRemote', {type:type, event:event})
})

socket.on('toRemote', function(data) {
  if (data.type !== 'unload') // ignore unload events
    ARGON.managerPort.trigger(data.type, data.event)
})

socket.on('connection', function() {
  ARGON.immersiveContext.background.getJSON().then(function(json) {
    socket.emit('fromRemote', {
      type:'setBackground',
      event: json
    })
  })
})
