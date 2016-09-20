#!/usr/bin/env node
global.Promise = require( 'bluebird' );
let child = require( 'child_process' );
let fs = require( 'fs' );
let util = require( 'util' );
let gutil = require( 'gulp-util' );

let repository = 'https://github.com/prodest/es-na-palma-da-mao-mobile';
let GIT_LOG_CMD = 'git log --grep="%s" -E --format=%s %s..HEAD';
let GIT_TAG_CMD = 'git describe --tags --abbrev=0';
let HEADER_TPL = '<a name="%s"></a>\n# %s (%s)\n\n';
let LINK_ISSUE = `[#%s](${repository}/issues/%s)`;
let LINK_COMMIT = `[%s](${repository}/commit/%s)`;
let EMPTY_COMPONENT = '$$';

/**
 * Exibe uma mensagem de warning
 */
let warn = function() {
    gutil.log( 'WARNING:', util.format.apply( null, arguments ) );
};

/**
 * Realiza o parse de um commit
 *
 * @param {String} raw - o texto do commit em estado bruto (raw)
 *
 * @returns {Object} - Um objeto com o resultado do parse de um commit
 */
let parseRawCommit = ( raw ) => {
    if ( !raw ) {
        return null;
    }

    let lines = raw.split( '\n' );
    let msg = {};
    let match;

    msg.hash = lines.shift();
    msg.subject = lines.shift();
    msg.closes = [];
    msg.breaks = [];

    lines.forEach( ( line ) => {
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

    // normaliza components
    msg.component = msg.component.toLowerCase()
        .replace( /^espm$/, 'geral' )
        .replace( /^app$/, 'geral' )
        .replace( 'app-core-tools', 'geral' )
        .replace( 'app.d.ts', 'typings' )
        .replace( 'changelog-script', 'gulp' )
        .replace( 'gulpfile', 'gulp' )
        .replace( 'cbme ', 'cmbes' )
        .replace( 'ceturb ', 'ceturb' )
        .replace( 'diretiva', 'shared/directives' )
        .replace( /^new$/, 'news' )
        .replace( 'notícia', 'news' )
        .replace( 'news-details', 'news' )
        .replace( 'error-message', 'layout/messages' )
        .replace( 'menu', 'layout/menu' )
        .replace( 'shared/layout/menu', 'layout/menu' )
        .replace( 'spinner', 'layout/spinner' )
        .replace( 'cbme/warning-list', 'cbmes' )
        .replace( 'calendars', 'calendar' )
        .replace( 'calendar-news', 'news' )
        .replace( 'driver-license-status', 'detran' )
        .replace( /^vehicle$/, 'vehicles' )
        .replace( 'karma', 'tests' )
        .replace( 'unit-tests', 'tests' )
        .replace( 'readme', 'README' )
        .replace( /component-(.+)/, '$1' )
        .replace( /state-(.+)/, '$1' )
        .replace( /^(about)$/, 'components/$1' )
        .replace( /^(detran)$/, 'components/$1' )
        .replace( /^(dio)$/, 'components/$1' )
        .replace( /^(cbmes)$/, 'components/$1' )
        .replace( /^(sep)$/, 'components/$1' )
        .replace( /^(home)$/, 'components/$1' )
        .replace( /^(calendar)$/, 'components/$1' )
        .replace( /^(shared)/, 'components/$1' )
        .replace( /^(layout)/, 'components/$1' )
        .replace( /^(login)$/, 'components/$1' )
        .replace( /^(news)$/, 'components/$1' )
        .replace( /^(calendar)$/, 'components/$1' )
        .replace( /^(ceturb)$/, 'components/$1' )
        .replace( /^(dashboard)$/, 'components/$1' )
        .replace( /^(vehicles)$/, 'components/$1' );

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
let linkToIssue = ( issue ) => {
    return util.format( LINK_ISSUE, issue, issue );
};

/**
 * Cria um link apontando para um commit
 *
 * @param {String} hash - o hash do commit
 *
 * @returns {String} - retorna um link para um commit
 */
let linkToCommit = ( hash ) => {
    return util.format( LINK_COMMIT, hash.substr( 0, 8 ), hash );
};

/**
 * Obtém a data corrente no formato string
 *
 * @returns {String} - retorna a data
 */
let currentDate = () => {
    let now = new Date();
    let pad = ( i ) => {
        let retval = `0${i}`.substr( -2 );
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
let printSection = ( stream, title, section, printCommitLinks ) => {
    printCommitLinks = printCommitLinks === undefined ? true : printCommitLinks;
    let components = Object.getOwnPropertyNames( section ).sort();

    if ( !components.length ) {
        return;
    }

    stream.write( util.format( '\n### %s\n\n', title ) );

    components.forEach( ( name ) => {
        let prefix = '-';
        let nested = section[ name ].length > 1;

        if ( name !== EMPTY_COMPONENT ) {
            if ( nested ) {
                stream.write( util.format( '- **%s:**\n', name ) );
                prefix = '  -';
            } else {
                prefix = util.format( '- **%s:**', name );
            }
        }

        section[ name ].forEach( ( commit ) => {
            if ( printCommitLinks ) {
                stream.write( util.format( '%s %s\n  (%s', prefix, commit.subject, linkToCommit( commit.hash ) ) );
                if ( commit.closes.length ) {
                    stream.write( `,\n   ${commit.closes.map( linkToIssue ).join( ', ' )}` );
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
let readGitLog = ( grep, from ) => {
    return new Promise( ( resolve, reject ) => {
        child.exec( util.format( GIT_LOG_CMD, grep, '%H%n%s%n%b%n==END==', from ), ( error, stdout ) => {
            if ( error ) {
                reject( error );
            } else {
                let commits = [];
                stdout.split( '\n==END==\n' ).forEach( ( rawCommit ) => {
                    let commit = parseRawCommit( rawCommit );
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
let writeChangelog = ( stream, commits, version ) => {
    let sections = {
        fix: {},
        feat: {},
        perf: {},
        refact: {},
        breaks: {}
    };

    commits.forEach( ( commit ) => {
        let section = sections[ commit.type ];
        let component = commit.component || EMPTY_COMPONENT;

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
    printSection( stream, 'Features', sections.feat );
    printSection( stream, 'Bug Fixes', sections.fix );
    printSection( stream, 'Refactoring', sections.refact );
    printSection( stream, 'Performance Improvements', sections.perf );
    printSection( stream, 'Breaking Changes', sections.breaks, false );
};

/**
 * Obtém a git tag anterior
 *
 * @returns {Promise} - uma promise
 */
let getPreviousTag = () => {
    return new Promise( ( resolve, reject ) => {
        child.exec( GIT_TAG_CMD, ( error, stdout ) => {
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
let generate = ( version, from, file ) => {

    getPreviousTag()
        .then( ( tag ) => {
            if ( from ) {
                tag = from;
            }
            readGitLog( '^fix|^bugFix|^feat|^perf|^refact|BREAKING', tag ).then( ( commits ) => {
                writeChangelog( file ? fs.createWriteStream( file ) : process.stdout, commits, version );
            } );
        } )
        .catch( error => {
            console.log( 'Error: ', error );
        } );
};

generate( process.argv[ 2 ], process.argv[ 3 ], process.argv[ 4 ] );
