
initializeArgonRemoteDebugger()

function initializeArgonRemoteDebugger() {
  if (window.Argon && Argon.Platform.isRunningInArgonApp === false &&
      Argon.Platform.isRunningInDesktopBrowser === true &&
      Argon.Platform.isRunningInTopFrame === true ) {

    var socket = io({transports: ['websocket']})

    socket.on('connect', function() {
      console.log("Connected to remote debugging server!")
    })

    socket.on('toChannel', function(data) {
      if (!Argon.managerPort.isConnected) {
        Argon.managerPort.connect()
      }
      Argon.managerPort.output.emit(data.type, data.event)
    })

    Argon.managerPort.input.pipe( function(type, event) {
      if (Argon.managerPort.isConnected) {
        socket.emit('fromChannel', {type:type, event:event})
      }
    })

    Argon.setReady('Vuforia')

  } else if (window.Argon && location.pathname === "/debug/" || location.pathname === "/debug"){

    var socket = io({transports: ['websocket']})

    Argon.managerPort.output.pipe(function(type, event) {
      socket.emit('fromRemoteManager', {type:type, event:event})
    })

    socket.on('toRemoteManager', function(data) {
      if (data.type == 'unload') {
        location.reload()
      }
      Argon.managerPort.trigger(data.type, data.event)
    })

  } else if (!window.Argon) {
    setTimeout(initializeArgonRemoteDebugger, 1000)
  }
}
