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

    this.log(yosay('Welcome to the ' + chalk.red('argon') + ' generator!'));

    this.log("Checking your jspm global config for a gatech github registry...")
    var jspmConfig = require('jspm/lib/global-config').config
    if (!(jspmConfig && jspmConfig.registries && jspmConfig.registries.gatech)) {
      var registry = require('jspm/lib/registry')

      this.log("jspm gatech github registry was not found! Setting up a new registry...")
      Promise.resolve(registry.create('gatech', 'jspm-github')).then(
        function(success) {
            done()
        }, function(error) {
            done()
        }
      )
    } else {
        this.log("jspm gatech registry found!")
        done()
    }
  },

  writing: function () {
    this.log("Copying updated template files...")

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

    copyDir(this, 'src')
    copyDir(this, 'debug')
    copyDir(this, 'www')

    copyFile(this, 'package.json', true)
    copyFile(this, 'config.js', true)
    copyFile(this, 'gulpfile.js')
    copyFile(this, 'index.html')
  },

  install: function () {
    var done = this.async();
    this.log("Running `npm install`...")
    this.npmInstall()
    this.log("Running `jspm install`...")
    this.spawnCommand('jspm', ['install']).on('close', function () {
        done();
    });
  },

  end: function () {
    this.log(yosay('All done! Run '+ chalk.blue('`yo argon:exampleGeo`') +
      ' to see a geo-based example app, or run ' + chalk.blue('`gulp dev`') +
      ' to start the dev server.'))
  }
});
