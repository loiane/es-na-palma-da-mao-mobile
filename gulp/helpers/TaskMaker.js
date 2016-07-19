import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import _merge from 'lodash/merge';
import _isUndefined from 'lodash/isUndefined';
import _forEach from 'lodash/forEach';
import notify from 'gulp-notify';

/**
 *
 */
class TaskMaker {

    /**
     * constructor
     *
     * @param gulp
     */
    constructor( gulp ) {
        this.gulp = gulp;
        this.globalBrowserSyncs = {};
        this.log = this._createLoggerFor( 'taskMaker' );
    }

    /**
     *  Cria e inicia uma nova instância nomeada de browserSync
     *
     * @param {String} name
     * @param {Object} config
     * @param {function} callback
     *
     * @returns {void}
     */
    startNewBrowserSync( name, config, callback ) {
        let bs = this.createBrowserSync( name );
        if ( _isUndefined( config ) ) {
            throw new Error( 'startNewBrowserSync: config argument is missing' );
        }

        this.log( `starting browserSync: \'${name}\'`, 'yellow' );

        bs.init( config, function() {
            if ( callback ) {
                callback( bs );
            }
        } );
    }

    /**
     * Cria e NÃO inicia uma nova instância nomeada de browserSync
     *
     * @param {String} name -
     *
     * @returns {*|{init: *, exit: (exit|exports), notify: *, reload: *, cleanup: *, emitter: (Browsersync.events|*), use: *}}
     */
    createBrowserSync( name ) {
        if ( _isUndefined( name ) ) {
            throw new Error( 'createBrowserSync: name argument is missing' );
        }

        this.log( `creating browserSync: \'${name}\'`, 'yellow' );

        let bs = browserSync.create( name );
        this.globalBrowserSyncs[ name ] = bs;
        return bs;
    }

    /**
     *
     * @param opts
     */
    reloadAllBrowserSync( opts ) {
        if ( _isUndefined( opts ) ) {
            throw new Error( 'reloadAllBrowserSync: opts argument is missing' );
        }

        this.log( 'reloading all browserSync now ...', 'yellow' );

        _forEach( this.globalBrowserSyncs, ( bs ) => {
            bs.notify( 'reloading now ...' );
            bs.reload( opts );
        } );
    }

    /**
     *
     * @param name
     * @param options
     */
    defineTask( name, options = {} ) {

        if ( !options.taskMaker ) {
            options.taskMaker = this;
        }
        if ( !options.taskName ) {
            options.taskName = name;
        }
        if ( !options.taskDeps ) {
            options.taskDeps = [];
        }

        if ( !options.globalBrowserSyncs ) {
            options.globalBrowserSyncs = this.globalBrowserSyncs;
        }
        if ( !options.defaultErrorHandler ) {
            options.defaultErrorHandler = {
                errorHandler: notify.onError( '<%= error.message %>' )
            };
        }

        options.debug = _merge( {
            active: false,
            title: `[debug:${name}]`
        }, options.debug || {} );

        if ( options.debug.active ) {
            this.log( gutil.colors.yellow( 'Debuging Task:', name ) );
        }

        try {
            let TaskClass = require( `../tasks/${name}.js` ).default;
            let task = new TaskClass();

            task.log = this._createLoggerFor( options.taskName );
            task.setOptions( options ).defineTask( this.gulp );

            if ( options.watchTask && options.src ) {

                let newOptions = _merge( { tasks: [ options.taskName ] }, options );
                let WatchTask = require( '../tasks/watch.js' ).default;
                let instance = new WatchTask();
                newOptions.taskName = `watch-${options.taskName}`;

                instance.setOptions( newOptions ).defineTask( this.gulp );
                instance.log = this._createLoggerFor( options.taskName );
                this.log( `Created watch task: ${newOptions.taskName}` );
            }
        } catch ( e ) {
            this.log( gutil.colors.red( e ) );
            throw e;
        }
    }

    /**
     * Cria um logger para uma task
     *
     * @private
     */
    _createLoggerFor( loggerName ) {
        //ref: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        return function log( msg, color = 'gray' ) {
            gutil.log( gutil.colors[ color ]( `[${loggerName}]`, JSON.stringify( msg, null, 2 ) ) );
            /*eslint angular/json-functions: 0*/
        };
    }
}

export default TaskMaker;
