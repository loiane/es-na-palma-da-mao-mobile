System.config( {
    baseURL: "./",
    transpiler: "babel",
    defaultJSExtensions: true,
    babelOptions: {
        "optional": [
            "runtime", "optimisation.modules.system"
        ]
    },

    paths: {
        "github:*": "jspm_packages/github/*",
        "npm:*": "jspm_packages/npm/*"
    },

    buildCSS: true,

    map: {
        "angular": "github:angular/bower-angular@1.5.7",
        "angular-i18n": "npm:angular-i18n@1.5.7",
        "angular-material": "github:angular/bower-material@1.1.0-rc.5",
        "angular-mocks": "github:angular/bower-angular-mocks@1.5.7",
        "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.3.3",
        "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
        "babel": "npm:babel-core@5.8.38",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "bootstrap": "github:twbs/bootstrap@3.3.6",
        "calendar": "github:hoisel/ionic-calendar@1.0.0-pre",
        "core-js": "npm:core-js@1.2.6",
        "css": "github:systemjs/plugin-css@0.1.23",
        "font-awesome": "npm:font-awesome@4.6.3",
        "image": "github:systemjs/plugin-image@0.1.0",
        "ionic": "github:driftyco/ionic-bower@1.3.1",
        "ionic-native-transitions": "npm:ionic-native-transitions@1.0.0-rc9",
        "json": "github:systemjs/plugin-json@0.1.2",
        "mobile-detect": "npm:mobile-detect@1.3.2",
        "moment": "npm:moment@2.13.0",
        "ngstorage": "npm:ngstorage@0.3.10",
        "oclazyload": "github:ocombe/oclazyload@1.0.9",
        "oidc-token-manager": "github:IdentityModel/oidc-token-manager@1.2.0",
        "robotoDraft": "github:raibutera/robotodraft@1.1.0",
        "text": "github:systemjs/plugin-text@0.0.7",
        "toastr": "github:CodeSeven/toastr@2.1.2",
        "ts": "github:frankwallis/plugin-typescript@4.0.16",
        "typescript": "npm:typescript@1.8.10",
        "ui-router-extras": "github:christopherthielen/ui-router-extras@0.0.14",
        "underscore": "github:jashkenas/underscore@1.8.3",
        "github:CodeSeven/toastr@2.1.2": {
            "css": "github:systemjs/plugin-css@0.1.23",
            "jquery": "github:components/jquery@3.0.0"
        },
        "github:angular-ui/ui-router@0.2.18": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:angular/bower-angular-animate@1.5.7": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:angular/bower-angular-aria@1.5.7": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:angular/bower-angular-messages@1.5.7": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:angular/bower-angular-mocks@1.5.7": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:angular/bower-angular-sanitize@1.5.7": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:angular/bower-material@1.1.0-rc.5": {
            "angular": "github:angular/bower-angular@1.5.7",
            "angular-animate": "github:angular/bower-angular-animate@1.5.7",
            "angular-aria": "github:angular/bower-angular-aria@1.5.7",
            "angular-messages": "github:angular/bower-angular-messages@1.5.7",
            "css": "github:systemjs/plugin-css@0.1.23"
        },
        "github:christopherthielen/ui-router-extras@0.0.14": {
            "angular": "github:angular/bower-angular@1.5.7"
        },
        "github:driftyco/ionic-bower@1.3.1": {
            "angular": "github:angular/bower-angular@1.5.7",
            "angular-animate": "github:angular/bower-angular-animate@1.5.7",
            "angular-sanitize": "github:angular/bower-angular-sanitize@1.5.7",
            "angular-ui-router": "github:angular-ui/angular-ui-router-bower@0.2.13",
            "css": "github:systemjs/plugin-css@0.1.23"
        },
        "github:frankwallis/plugin-typescript@4.0.16": {
            "typescript": "npm:typescript@1.8.10"
        },
        "github:jspm/nodelibs-assert@0.1.0": {
            "assert": "npm:assert@1.4.1"
        },
        "github:jspm/nodelibs-buffer@0.1.0": {
            "buffer": "npm:buffer@3.6.0"
        },
        "github:jspm/nodelibs-os@0.1.0": {
            "os-browserify": "npm:os-browserify@0.1.2"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.2": {
            "process": "npm:process@0.11.5"
        },
        "github:jspm/nodelibs-util@0.1.0": {
            "util": "npm:util@0.10.3"
        },
        "github:jspm/nodelibs-vm@0.1.0": {
            "vm-browserify": "npm:vm-browserify@0.0.4"
        },
        "github:twbs/bootstrap@3.3.6": {
            "jquery": "npm:jquery@2.2.4"
        },
        "npm:assert@1.4.1": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.2",
            "util": "npm:util@0.10.3"
        },
        "npm:babel-runtime@5.8.38": {
            "process": "github:jspm/nodelibs-process@0.1.2"
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
        "npm:font-awesome@4.6.3": {
            "css": "github:systemjs/plugin-css@0.1.23"
        },
        "npm:inherits@2.0.1": {
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:ionic-native-transitions@1.0.0-rc9": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "systemjs-json": "github:systemjs/plugin-json@0.1.2"
        },
        "npm:mobile-detect@1.3.2": {
            "child_process": "github:jspm/nodelibs-child_process@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0"
        },
        "npm:os-browserify@0.1.2": {
            "os": "github:jspm/nodelibs-os@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:process@0.11.5": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "vm": "github:jspm/nodelibs-vm@0.1.0"
        },
        "npm:typescript@1.8.10": {
            "os": "github:jspm/nodelibs-os@0.1.0"
        },
        "npm:util@0.10.3": {
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:vm-browserify@0.0.4": {
            "indexof": "npm:indexof@0.0.1"
        }
    }
} );
