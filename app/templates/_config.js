System.config({
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "gatech:*": "jspm_packages/gatech/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "argon": "gatech:ael/argon.js@0.0.13",
    "image": "github:systemjs/plugin-image@0.1.0",
    "three": "github:mrdoob/three.js@r70",
    "threestrap": "github:unconed/threestrap@0.0.9",
    "github:unconed/threestrap@0.0.9": {
      "three": "github:mrdoob/three.js@r70"
    }
  }
});
