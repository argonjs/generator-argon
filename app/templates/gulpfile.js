var gulp = require('gulp')
var port = 1337
var express = require('express')
var cheerio = require('cheerio')

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

  app.get(['/', '/index.html'], function(req, res, next) {
    try {
      var html = fs.readFileSync(__dirname + '/index.html', 'utf8')
      var $ = cheerio.load(html)
      var scripts = [
        '<script src="/socket.io/socket.io.js"></script>',
        '<script>System.import("./debug/remoteDebug")</script>'
      ].join('\n')

      $('body').append(scripts)
      res.send($.html())
    } catch (e) {
      next(e)
    }
  })

  app.get(['/www/*.html',/\/www\/.*\/$/], function(req, res, next) {
    try {
      var endsInSlash = req.url[req.url.length-1] === '/'
      var filePath = __dirname + req.url + (endsInSlash ? 'index.html' : '')
      var html = fs.readFileSync(filePath, 'utf8')
      var $ = cheerio.load(html)
      var scripts = [
        '<script src="/socket.io/socket.io.js"></script>',
        '<script src="/debug/remoteDebugScript.js"></script>'
      ].join('\n')

      $('body').append(scripts)
      res.send($.html())
    } catch (e) {
      next(e)
    }
  })

  app.use(express.static('./'))

  io.on('connection', function (socket) {
    socket.on('fromChannel', function (data) {
       socket.broadcast.emit('toRemote', data)
    })
    socket.on('fromRemote', function (data) {
      socket.broadcast.emit('toChannel', data)
    })
    socket.broadcast.emit('connection')
  })

  server.listen(port, cb)
  console.log('Listening on port ' + port)
})
