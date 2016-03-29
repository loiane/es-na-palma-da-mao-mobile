import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import _merge from 'lodash/merge';
import _isUndefined from 'lodash/isUndefined';
import _forEach from 'lodash/forEach';
import notify from 'gulp-notify';

class TaskMaker {
    constructor(gulp) {
        this.gulp = gulp;
        this.globalBrowserSyncs = {};
        this.log  = this._createLoggerFor('taskMaker');
    }

    /**
     * Create and init a new browserSync named instance
     */
    startNewBrowserSync(name, config, callback) {
        let bs = this.createBrowserSync(name);
        if (_isUndefined(config)) {
            throw new Error('startNewBrowserSync: config argument is missing');
        }

        this.log(`starting browserSync: \'${name}\'`, 'yellow');    
       
        bs.init(config, function(){
            if(callback){
                callback(bs);
            }
        });
    }
    
    /**
     * Create a new browserSync instance and DOES NOT init it 
     */
    createBrowserSync(name) {
        if (_isUndefined(name)) {
            throw new Error('createBrowserSync: name argument is missing');
        }
        
        this.log(`creating browserSync: \'${name}\'`, 'yellow');
        
        let bs = browserSync.create(name);
        this.globalBrowserSyncs[name] = bs;
        return bs;
    }
    
    
    reloadAllBrowserSync(opts){
        if (_isUndefined(opts)) {
            throw new Error('reloadAllBrowserSync: opts argument is missing');
        }
        
        this.log('reloading all browserSync now ...', 'yellow');
        
        _forEach(this.globalBrowserSyncs, (bs) => {
            bs.notify('reloading now ...');
            bs.reload(opts);
        });
    }
    
    defineTask(name, options = {}) {
        name = this._resolveAliases(name);

        if (!options.taskMaker) {
            options.taskMaker = this;
        }
        if (!options.taskName) {
            options.taskName = name;
        }
        if (!options.taskDeps) {
            options.taskDeps = [];
        }

        if (!options.globalBrowserSyncs) {
            options.globalBrowserSyncs = this.globalBrowserSyncs;
        }
        if (!options.defaultErrorHandler) {
            options.defaultErrorHandler = {
                errorHandler: notify.onError('<%= error.message %>')
            };
        }
        
        options.debug = _merge({ active: false, title: `[debug:${name}]` }, options.debug || {});
        
        if(options.debug.active){
            gutil.log(gutil.colors.yellow('Debuging Task:', name));
        }
    
        try {
            let TaskClass = require(`../tasks/${name}.js`).default;
            let task = new TaskClass();
            task.log = this._createLoggerFor(options.taskName);
            task.setOptions(options).defineTask(this.gulp);

            if (options.watchTask && options.src) {
                
                let newOptions = _merge({ tasks: [options.taskName] }, options);
                let WatchTask = require('../tasks/watch.js').default;
                let instance =  new WatchTask();
                newOptions.taskName = `watch-${options.taskName}`;
                
                instance.setOptions(newOptions).defineTask(this.gulp);
                instance.log = this._createLoggerFor(options.taskName);
                gutil.log(`Created watch task: ${newOptions.taskName}`);
            }
        } catch (e) {
            gutil.log(gutil.colors.red(e));
            throw e;
        }
    }

    /**
	 * The author was stupid and made a bad naming decision.
	 *
	 * @private
	 */
    _resolveAliases(name) {
        if (name === 'es6') {
            gutil.log(gutil.colors.magenta('Please rename the es6 task to babel'));
            return 'babel';
        }
        return name;
    }
    
    
    /**
	 * Cria um logger para uma task
	 *
	 * @private
	 */
    _createLoggerFor(loggerName){
        //ref: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        return function log(msg, color = 'gray') {
            gutil.log(gutil.colors[color](`[${loggerName}]`, JSON.stringify(msg, null, 2) )); 
        };
        }
    }



    export default TaskMaker;
