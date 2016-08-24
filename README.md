How to Use
===

# NOTE: This generator does not currently work.  It is aimed at Argon3, we are upgrading everything to Argon4.  Please do not use.

For those unfamiliar with jspm and yo, together they let us create a simple package bootstrapping scheme that includes debugging and other useful features. 
First, jspm is a javascript package manager for the SystemJS universal module loader (jspm.io).  We use this to download the necessary Javascript libraries, including the latest version of argon.js and others.
Second, yoeoman (yeoman.io) helps you kickstart new projects using installed templates. 

This project sets up an Argon generator for Yeoman.  To get ready to use it, install it as follows:

1. Install [node.js/npm](http://nodejs.org)

2. Install gulp, jspm, yo, and generator-argon:  
  ```sh
  npm install -g gulp jspm yo generator-argon
  ```

Once these steps are complete, you can now use yeoman to bootstrap a new Argon project. 

Simply create a new, empty directory whereever you'd like your new project to be, cd into it, and use ```yo argon``` to fill it with a new sample project, ready to be used as you like, such as:

  ```sh
  mkdir my_argon_project
  cd my_argon_project
  yo argon
  ```

The project is set up with an index.html file at the top level, that uses SystemJS / jspm to load the application's Javascript from src/app.js. 

  ```sh
  gulp dev
  ```
  
In Argon, enter `<your-ip>:1337` as the url to see the example app.
  
To use the remote debugger, enter  `<your-ip>:1337/debug/` in Argon, and load your channel on your desktop browser. The remote debugger should work with any .html files in your project. 

