import gulp from 'gulp';
import paths from '../paths';
import ts from 'gulp-typescript';
import webpack from 'webpack-stream';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import notifier from 'node-notifier';
import gaze from 'gaze';
import tslint from 'gulp-tslint';
import clean from 'gulp-clean';
import save from 'gulp-save';

function handleCompilerError(error) {
   notifier.notify({
       title: 'Typescript Error Happened',
       message: `Here is a problem: ${error.message}`
   });

   this.emit('end');
}

gulp.task('scripts:watch', () => {
   return gaze([`${paths.src.ts}/**/*.ts`], function (event, filepath) {
       // On changed/added/deleted
       this.on('all', (event, filepath) => {
           gulp.start('scripts:build:dev');
       });

       this.on('added', (filepath) => {
           notifier.notify({
               title: 'Typescript Compiler Information',
               message: `File ${filepath} was added to typescript watch`
           });
       });

       this.on('deleted', (filepath) => {
           notifier.notify({
               title: 'Typescript Compiler Information',
               message: `File ${filepath} was deleted from typescript watch`
           });
       });
   });
});

gulp.task('scripts:build:dev', () => {
   return gulp.src(`${paths.src.ts}/main.ts`)
       .pipe(webpack(require('../../webpack.config.js')))
           .on('error', handleCompilerError)
       .pipe(gulp.dest(paths.dist.js));
});

gulp.task('scripts:clean', () => {
    return gulp.src(`${paths.dist.js}/*.map`)
        .pipe(clean({
            force: true,
        }));
});

gulp.task('scripts:build:prod', ['scripts:clean'], () => {
   return gulp.src(`${paths.src.ts}/main.ts`)
       .pipe(webpack(require('../../webpack.config.prod.js')))
           .on('error', handleCompilerError)
       .pipe(gulp.dest(paths.dist.js));
});

gulp.task('scripts:default', [
    'scripts:build:dev',
    'scripts:watch',
]);
