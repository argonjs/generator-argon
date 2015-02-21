How to Use
===
1. Install [node.js/npm](http://nodejs.org)

2. Install gulp, jspm, and yo:  
```sh
npm install -g gulp jspm yo
```

3. Install the argon-jspm generator:  
```sh
git clone https://github.com/argonjs/generator-argon-jspm.git
cd generator-argon-jspm
npm link
```

4. Create a directory for your project and generate the base files and dependencies:  
```sh
mkdir my_argon_project
cd my_argon_project
yo argon-jspm
```

5. Test the example app:  
```sh
gulp dev
```

In Argon, enter `<your-ip>:1337` as the url to see the example app.
