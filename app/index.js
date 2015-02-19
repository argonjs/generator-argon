'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var which = require('which')
var Promise = require('bluebird')

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    try {
        which.sync('jspm')
    } catch(e) {
        throw 'Jspm is required. Use `npm install -g jspm` to install it.'
    }

    try {
        which.sync('gulp')
    } catch(e) {
        throw 'Gulp is required. Use `npm install -g gulp` to install it.'
    }

    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay('Welcome to the ' + chalk.red('ArgonJspm') + ' generator!'));

    var jspmConfig = require('jspm/lib/global-config').config
    if (!(jspmConfig && jspmConfig.endpoints && jspmConfig.endpoints.gatech)) {
      var jspmEndpoint = require('jspm/lib/endpoint')

      Promise.resolve(jspmEndpoint.create('gatech', 'jspm-github')).then(
        function(success) {
            done()
        }, function(error) {
            done()
        }
      )
    } else {
        done()
    }
  },

  writing: function () {
    function copyDir(context, dir) {
      context.fs.copy(
        context.templatePath(dir) + '/*',
        context.destinationPath(dir) + '/'
      )
    }

    function copyFile(context, file, removeUnderscore) {
      context.fs.copy(
        context.templatePath((removeUnderscore ? '_' : '') + file),
        context.destinationPath(file)
      )
    }

    copyDir(this, 'lib')
    copyDir(this, 'debug')

    copyFile(this, 'package.json', true)
    copyFile(this, 'config.js', true)
    copyFile(this, 'gulpfile.js')
    copyFile(this, 'index.html')
  },

  install: function () {
    this.npmInstall()
    this.spawnCommand('jspm', ['install'])
  },

  end: function () {
    this.log('All done!')
    this.log('Run `gulp dev` to test out the example argon app.')
  }
});
