System.config( {
    baseURL: "/",
    defaultJSExtensions: true,
    transpiler: "babel",
    babelOptions: {
        "optional": [
            "runtime", "optimisation.modules.system"
        ]
    },
    paths: {
        "github:*": "lib/github/*",
        "npm:*": "lib/npm/*"
    },
    buildCSS: true,

    map: {
        "angular": "github:angular/bower-angular@1.5.5",
        "angular-material": "github:angular/bower-material@1.0.7",
        "angular-mocks": "github:angular/bower-angular-mocks@1.5.0",
        "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.2.4",
        "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
        "babel": "npm:babel-core@5.8.35",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "bootstrap": "github:twbs/bootstrap@3.3.6",
        "core-js": "npm:core-js@1.2.6",
        "css": "github:systemjs/plugin-css@0.1.21",
        "font-awesome": "npm:font-awesome@4.5.0",
        "image": "github:systemjs/plugin-image@0.1.0",
        "ionic": "github:driftyco/ionic-bower@1.3.0",
        "jquery": "npm:jquery@2.2.1",
        "json": "github:systemjs/plugin-json@0.1.0",
        "mobile-detect": "npm:mobile-detect@1.3.2",
        "oclazyload": "github:ocombe/oclazyload@1.0.9",
        "robotoDraft": "github:raibutera/robotodraft@1.1.0",
        "text": "github:systemjs/plugin-text@0.0.7",
        "toastr": "github:CodeSeven/toastr@2.1.2",
        "ui-router-extras": "github:christopherthielen/ui-router-extras@0.0.14",
        "zepto": "npm:zepto@1.0.1",
        "github:CodeSeven/toastr@2.1.2": {
            "css": "github:systemjs/plugin-css@0.1.21",
            "jquery": "github:components/jquery@2.2.1"
        },
        "github:angular-ui/ui-router@0.2.13": {
            "angular": "github:angular/bower-angular@1.5.5"
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
            "css": "github:systemjs/plugin-css@0.1.21"
        },
        "github:christopherthielen/ui-router-extras@0.0.14": {
            "angular": "github:angular/bower-angular@1.5.5"
        },
        "github:driftyco/ionic-bower@1.3.0": {
            "angular": "github:angular/bower-angular@1.5.5",
            "angular-animate": "github:angular/bower-angular-animate@1.5.5",
            "angular-sanitize": "github:angular/bower-angular-sanitize@1.5.5",
            "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
            "css": "github:systemjs/plugin-css@0.1.21"
        },
        "github:jspm/nodelibs-assert@0.1.0": {
            "assert": "npm:assert@1.3.0"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.2": {
            "process": "npm:process@0.11.2"
        },
        "github:jspm/nodelibs-util@0.1.0": {
            "util": "npm:util@0.10.3"
        },
        "github:twbs/bootstrap@3.3.6": {
            "jquery": "github:components/jquery@2.2.1"
        },
        "npm:assert@1.3.0": {
            "util": "npm:util@0.10.3"
        },
        "npm:babel-runtime@5.8.35": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:core-js@1.2.6": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.2",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:font-awesome@4.5.0": {
            "css": "github:systemjs/plugin-css@0.1.21"
        },
        "npm:inherits@2.0.1": {
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:mobile-detect@1.3.2": {
            "child_process": "github:jspm/nodelibs-child_process@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:process@0.11.2": {
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
} );

System.import( 'mobile-detect' ).then( function( MobileDetect ) {
    var PLUGIN_NAME = '!platform';
    var WEB_FOLDER = '/web';
    var MOBILE_FOLDER = '/mobile';

    var md = new MobileDetect( window.navigator.userAgent );
    var systemNormalize = System.normalize;

    System.normalize = function( name, parentName, parentAddress ) {

        if ( name.indexOf( PLUGIN_NAME ) !== -1 ) {
            name = name.replace( PLUGIN_NAME, '' );

            if ( md.mobile() ) {
                name = name.replace( WEB_FOLDER, MOBILE_FOLDER );
            }

            else if ( !md.mobile() ) {
                name = name.replace( MOBILE_FOLDER, WEB_FOLDER );
            }
        }
        return systemNormalize.call( this, name, parentName, parentAddress );
    }
} );
