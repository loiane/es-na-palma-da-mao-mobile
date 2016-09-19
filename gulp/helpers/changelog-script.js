#!/usr/bin/env node
global.Promise = require( 'bluebird' );
var child = require( 'child_process' );
var fs = require( 'fs' );
var util = require( 'util' );
var gutil = require( 'gulp-util' );

var repository = 'https://github.com/prodest/es-na-palma-da-mao-mobile';
var GIT_LOG_CMD = 'git log --grep="%s" -E --format=%s %s..HEAD';
var GIT_TAG_CMD = 'git describe --tags --abbrev=0';
var HEADER_TPL = '<a name="%s"></a>\n# %s (%s)\n\n';
var LINK_ISSUE = '[#%s](' + repository + '/issues/%s)';
var LINK_COMMIT = '[%s](' + repository + '/commit/%s)';
var EMPTY_COMPONENT = '$$';

/**
 * Exibe uma mensagem de warning
 */
var warn = function() {
    gutil.log( 'WARNING:', util.format.apply( null, arguments ) );
};

/**
 * Realiza o parse de um commit
 *
 * @param {String} raw - o texto do commit em estado bruto (raw)
 *
 * @returns {Object} - Um objeto com o resultado do parse de um commit
 */
var parseRawCommit = function( raw ) {
    if ( !raw ) {
        return null;
    }

    var lines = raw.split( '\n' );
    var msg = {};
    var match;

    msg.hash = lines.shift();
    msg.subject = lines.shift();
    msg.closes = [];
    msg.breaks = [];

    lines.forEach( function( line ) {
        match = line.match( /(?:[Cc]loses|[Ff]ixes)\s#(\d+)/ );
        if ( match ) {
            msg.closes.push( parseInt( match[ 1 ], 10 ) );
        }
    } );

    match = raw.match( /BREAKING CHANGE:([\s\S]*)/ );
    if ( match ) {
        msg.breaking = match[ 1 ];
    }

    msg.body = lines.join( '\n' );
    match = msg.subject.match( /^(.*)\((.*)\)\:\s(.*)$/ );

    if ( !match || !match[ 1 ] || !match[ 3 ] ) {
        warn( 'Incorrect message: %s %s', msg.hash, msg.subject );
        return null;
    }

    msg.type = match[ 1 ];
    msg.component = match[ 2 ];
    msg.subject = match[ 3 ];

    // normalização
    if ( msg.type === 'bugFix' ) {
        msg.type = 'fix';
    }

    return msg;
};

/**
 * Cria um link apontando para um issue
 *
 * @param {String} issue -
 *
 * @returns {String} - retorna um link para um issue
 */
var linkToIssue = function( issue ) {
    return util.format( LINK_ISSUE, issue, issue );
};

/**
 * Cria um link apontando para um commit
 *
 * @param {String} hash - o hash do commit
 *
 * @returns {String} - retorna um link para um commit
 */
var linkToCommit = function( hash ) {
    return util.format( LINK_COMMIT, hash.substr( 0, 8 ), hash );
};

/**
 * Obtém a data corrente no formato string
 *
 * @returns {String} - retorna a data
 */
var currentDate = function() {
    var now = new Date();
    var pad = function( i ) {
        var retval = ('0' + i).substr( -2 );
        return retval;
    };

    return util.format( '%s-%s-%d', pad( now.getDate() ), pad( now.getMonth() + 1 ), now.getFullYear() );
};

/**
 *
 *
 * @param stream
 * @param title
 * @param section
 * @param printCommitLinks
 *
 * @returns {Promise} - uma promise
 */
var printSection = function( stream, title, section, printCommitLinks ) {
    printCommitLinks = printCommitLinks === undefined ? true : printCommitLinks;
    var components = Object.getOwnPropertyNames( section ).sort();

    if ( !components.length ) {
        return;
    }

    stream.write( util.format( '\n### %s\n\n', title ) );

    components.forEach( function( name ) {
        var prefix = '-';
        var nested = section[ name ].length > 1;

        if ( name !== EMPTY_COMPONENT ) {
            if ( nested ) {
                stream.write( util.format( '- **%s:**\n', name ) );
                prefix = '  -';
            } else {
                prefix = util.format( '- **%s:**', name );
            }
        }

        section[ name ].forEach( function( commit ) {
            if ( printCommitLinks ) {
                stream.write( util.format( '%s %s\n  (%s', prefix, commit.subject, linkToCommit( commit.hash ) ) );
                if ( commit.closes.length ) {
                    stream.write( ',\n   ' + commit.closes.map( linkToIssue ).join( ', ' ) );
                }
                stream.write( ')\n' );
            } else {
                stream.write( util.format( '%s %s\n', prefix, commit.subject ) );
            }
        } );
    } );

    stream.write( '\n' );
};

/**
 * Lê o log do git à partir de uma tag
 *
 * @param grep
 * @param from
 *
 * @returns {Promise} - uma promise
 */
var readGitLog = function( grep, from ) {
    return new Promise( function( resolve, reject ) {
        child.exec( util.format( GIT_LOG_CMD, grep, '%H%n%s%n%b%n==END==', from ), function( error, stdout ) {
            if ( error ) {
                reject( error );
            } else {
                var commits = [];
                stdout.split( '\n==END==\n' ).forEach( function( rawCommit ) {
                    var commit = parseRawCommit( rawCommit );
                    if ( commit ) {
                        commits.push( commit );
                    }
                } );

                resolve( commits );
            }
        } );
    } );
};

/**
 * Escreve o arquivo de changelog
 *
 * @param {Object} stream - a stream que representa o arquivo sendo criado
 * @param {Object[]} commits - lista de commits que serão usados para preencher o arquivo de changelog
 * @param {String} version - a versão da app associada no changelog
 *
 * @returns {Promise} - uma promise
 */
var writeChangelog = function( stream, commits, version ) {
    var sections = {
        fix: {},
        feat: {},
        perf: {},
        refact: {},
        breaks: {}
    };

    commits.forEach( function( commit ) {
        var section = sections[ commit.type ];
        var component = commit.component || EMPTY_COMPONENT;

        if ( section ) {
            section[ component ] = section[ component ] || [];
            section[ component ].push( commit );
        }

        if ( commit.breaking ) {
            sections.breaks[ component ] = sections.breaks[ component ] || [];
            sections.breaks[ component ].push( {
                subject: util.format( 'due to %s,\n %s', linkToCommit( commit.hash ), commit.breaking ),
                hash: commit.hash,
                closes: []
            } );
        }
    } );

    stream.write( util.format( HEADER_TPL, version, version, currentDate() ) );
    printSection( stream, 'Bug Fixes', sections.fix );
    printSection( stream, 'Features', sections.feat );
    printSection( stream, 'Performance Improvements', sections.perf );
    printSection( stream, 'Refactoring', sections.refact );
    printSection( stream, 'Breaking Changes', sections.breaks, false );
};

/**
 * Obtém a git tag anterior
 *
 * @returns {Promise} - uma promise
 */
var getPreviousTag = function() {
    return new Promise( function( resolve, reject ) {
        child.exec( GIT_TAG_CMD, function( error, stdout ) {
            if ( error ) {
                reject( 'Não foi possível obter a última tag.' );
            } else {
                resolve( stdout.replace( '\n', '' ) );
            }
        } );
    } );
};

/**
 * Gera um arquivo de changelog
 *
 * @param {String} version - a versão do da app
 * @param {String} from - uma git tag a partir de onde as alterações serão buscadas
 * @param {String} file - o nome do arquivo de changelog que conterá as alterações
 *
 * @returns {Promise} - uma promise
 */
var generate = function( version, from, file ) {

    getPreviousTag()
        .then( function( tag ) {
            //console.log( 'Lendo o log desde a tag:', tag ); 
            if ( from ) {
                tag = from;
            }
            //console.log( 'Parsed', commits.length, 'commits' );
            //console.log( 'Generating changelog to', file || 'stdout', '(', version, ')' );
            readGitLog( '^fix|^bugFix|^feat|^perf|^refact|BREAKING', tag ).then( function( commits ) {
                writeChangelog( file ? fs.createWriteStream( file ) : process.stdout, commits, version );
            } );
        } )
        .catch( error => {
            console.log('Error: ', error );
        } );
};

generate( process.argv[ 2 ], process.argv[ 3 ], process.argv[ 4 ] );
