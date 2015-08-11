var gulp = require('gulp')
var port = 1337
var express = require('express')
var cheerio = require('cheerio')
var mime = require('mime')
var serveIndex = require('serve-index')
var ip = require('ip')

gulp.task('serve', function(cb) {
  var app = express()
  app.use(express.static('./'))
  app.listen(port, cb)
  console.log('Listening on port ' + port)
})

gulp.task('default', ['serve'])

gulp.task('dev', function(cb) {
  var express = require('express')
  var app = express()
  var server = require('http').Server(app)
  var io = require('socket.io')(server)
  var fs = require('fs')

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  })

  app.use(function(req, res, next) {
    var endsInSlash = req.url[req.url.length-1] === '/'
    var filePath = __dirname + decodeURIComponent(req.url) + (endsInSlash ? 'index.html' : '')
    if (mime.lookup(filePath) === 'text/html') {
      fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) return next()
        try {
          var $ = cheerio.load(data)
          var address = ip.address();
          var scripts = [
            '<script>if (location.hostname === "localhost") location.hostname = "'+ address +'"</script>',
            '<script src="/socket.io/socket.io.js"></script>',
            '<script src="/debug/remoteDebugScript.js"></script>\n'
          ].join('\n')
          var $body = $('body')
          if ($body) $body.prepend(scripts)
          else $.root().prepend(scripts)
          res.send($.html())
        } catch (e) {
          next(e)
        }
      })
    } else {
      next()
    }
  })

  // app.use(express.static('./'))
  app.get('*', express.static(__dirname ), serveIndex(__dirname, {view: 'details'}) )

  io.on('connection', function (socket) {
    socket.on('fromChannel', function (data) {
       socket.broadcast.emit('toRemoteManager', data)
    })
    socket.on('fromRemoteManager', function (data) {
      socket.broadcast.emit('toChannel', data)
    })
    socket.broadcast.emit('connection')
  })

  server.listen(port, cb)
  console.log('Listening on port ' + port)
})
