How to Use
===

For those unfamiliar with jspm and yo, together they let us create a simple package bootstrapping scheme that includes debugging and other useful features. 
First, jspm is a javascript package manager for the SystemJS universal module loader (jspm.io).  We use this to download the necessary Javascript libraries, including the latest version of argon.js and others.
Second, yoeoman (yeoman.io) helps you kickstart new projects using installed templates. 

This project sets up an Argon generator for Yeoman.  To get ready to use it, install it as follows:

1. Install [node.js/npm](http://nodejs.org)

2. Install gulp, jspm, and yo:  
  ```sh
  npm install -g gulp jspm yo
  ```

3. Install the argon generator (using the following git clone command, or "clone on desktop" from github.com):  
  ```sh
  git clone https://github.com/argonjs/generator-argon.git
  cd generator-argon
  npm link
  ```

Once these steps are complete, you can now use yeoman to bootstrap a new Argon project. 

Simply create a new, empty directory whereever you'd like your new project to be, cd into it, and use ```yo argon``` to fill it with a new sample project, ready to be used as you like, such as:

  ```sh
  mkdir my_argon_project
  cd my_argon_project
  yo argon
  ```

The project is set up with an index.html file at the top level, that uses SystemJS to load the application's Javascript from src/app.js. 

  ```sh
  gulp dev
  ```
  
In Argon, enter `<your-ip>:1337` as the url to see the example app.
  
The project will also serve up any .html files it finds in a ```www/``` directory (if you create one).  If you just want to use this sample as a debugger for your existing Argon html project, create a ```www/``` directory and copy you web application into it.  
  
To use the remote debugger, enter  `<your-ip>:1337/debug/` in Argon, and load your channel on your desktop browser. 
