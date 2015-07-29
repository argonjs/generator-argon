'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var which = require('which')
var Promise = require('bluebird')

module.exports = yeoman.generators.Base.extend({

  writing: function () {
    this.log("Copying updated template files...")

    function copyDir(context, dir) {
      context.fs.copy(
        context.templatePath(dir) + '/*',
        context.destinationPath(dir) + '/'
      )
    }

    copyDir(this, 'src')
  },

  end: function () {
    this.log(yosay('All done! Run '+ chalk.blue('`gulp dev`') + ' to test out the example argon app.'))
  }
  
});
