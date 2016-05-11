import innerGulp from 'gulp';
import gulpHelp from 'gulp-help';
import yargs from 'yargs';
import fs from 'fs';
import { exec } from 'gulp-exec';
import concat from 'gulp-concat';
import order from 'gulp-order';

const argv = yargs.argv;
const gulp = gulpHelp( innerGulp ); // wrap in gulp help
const readJsonFile = ( file ) => {
    return JSON.parse( fs.readFileSync( file ) );
};

gulp.task( 'changelog', 'Gera um arquivo CHANGELOG.md.', ( done ) => {
    const pkg = readJsonFile( config.packageJson );
    const options = argv;
    const version = options.version || pkg.version;
    const from = options.from || '';

    gulp.src( '' )
        .pipe( exec( `node ./gulp_tasks/common/changelog-script.js ${version} $from}`, {
            pipeStdout: true
        } ) )
        .pipe( concat( 'updates.md' ) )
        //.pipe( helper.addSrc( 'CHANGELOG.md' ) )
        .pipe( order( [ 'updates.md', 'CHANGELOG.md' ] ) )
        .pipe( concat( 'CHANGELOG.md' ) )
        .pipe( gulp.dest( './' ) )
        .on( 'end', done );
} );
