System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "lib/github/*",
    "npm:*": "lib/npm/*"
  },
  buildCSS: true,

  map: {
    "angular": "github:angular/bower-angular@1.5.5",
    "angular-i18n": "npm:angular-i18n@1.5.7",
    "angular-material": "github:angular/bower-material@1.0.7",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.0",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.2.4",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "calendar": "github:hoisel/ionic-calendar@1.0.0-pre",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.22",
    "font-awesome": "npm:font-awesome@4.5.0",
    "image": "github:systemjs/plugin-image@0.1.0",
    "ionic": "github:driftyco/ionic-bower@1.3.1",
    "ionic-native-transitions": "npm:ionic-native-transitions@1.0.0-rc10",
    "jquery": "npm:jquery@2.2.1",
    "json": "github:systemjs/plugin-json@0.1.2",
    "mobile-detect": "npm:mobile-detect@1.3.2",
    "ngstorage": "npm:ngstorage@0.3.10",
    "oclazyload": "github:ocombe/oclazyload@1.0.9",
    "oidc-token-manager": "github:IdentityModel/oidc-token-manager@1.2.0",
    "robotoDraft": "github:raibutera/robotodraft@1.1.0",
    "text": "github:systemjs/plugin-text@0.0.7",
    "toastr": "github:CodeSeven/toastr@2.1.2",
    "ui-router-extras": "github:christopherthielen/ui-router-extras@0.0.14",
    "underscore": "github:jashkenas/underscore@1.8.3",
    "zepto": "npm:zepto@1.0.1",
    "github:CodeSeven/toastr@2.1.2": {
      "css": "github:systemjs/plugin-css@0.1.22",
      "jquery": "github:components/jquery@2.2.1"
    },
    "github:angular-ui/ui-router@0.2.18": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-animate@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-aria@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-mocks@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-sanitize@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-material@1.0.7": {
      "angular": "github:angular/bower-angular@1.5.5",
      "angular-animate": "github:angular/bower-angular-animate@1.5.5",
      "angular-aria": "github:angular/bower-angular-aria@1.5.5",
      "css": "github:systemjs/plugin-css@0.1.22"
    },
    "github:christopherthielen/ui-router-extras@0.0.14": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:driftyco/ionic-bower@1.3.1": {
      "angular": "github:angular/bower-angular@1.5.5",
      "angular-animate": "github:angular/bower-angular-animate@1.5.5",
      "angular-sanitize": "github:angular/bower-angular-sanitize@1.5.5",
      "angular-ui-router": "github:angular-ui/angular-ui-router-bower@0.2.13",
      "css": "github:systemjs/plugin-css@0.1.22"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.1"
    },
    "npm:assert@1.4.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-shims": "npm:buffer-shims@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer-shims@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.22"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:ionic-native-transitions@1.0.0-rc10": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:mobile-detect@1.3.2": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:zepto@1.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
