'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var spawn = require('child_process').spawn
var which = require('which')

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

    var jspmConfig = require('jspm/lib/global-config').config

    this.pkg = require('../package.json');
    
    if (jspmConfig && jspmConfig.endpoints && jspmConfig.endpoints.gatech) {
        // Do nothing
    } else {
        spawn('jspm', ['endpoint', 'create', 'gatech', 'jspm-github'])
    }
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the world-class' + chalk.red('ArgonJspm') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
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
