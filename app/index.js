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

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
