import gulp from 'gulp';
import twig from 'gulp-twig';
import gutil from 'gulp-util';
import notifier from 'node-notifier';
import gaze from 'gaze';
import paths from '../paths'

gulp.task('twig:watch', () => {
    return gaze([`${paths.src.twig}/**/*.twig`], function (event, filepath) {
        // On changed/added/deleted 
        this.on('all', (event, filepath) => {
            gulp.start('twig:compile');
        });

        this.on('added', (filepath) => {
            notifier.notify({
                title: 'Twig Compiler Information',
                message: `File ${filepath} was added to twig watch`
            });
        });

        this.on('deleted', (filepath) => {
            notifier.notify({
                title: 'Twig Compiler Information',
                message: `File ${filepath} was deleted from twig watch`
            });
        });
    });
});

gulp.task('twig:compile', () => {
    const twigCompiler = twig({
        base: `${__dirname}/../../src/twig`
    });

    return gulp.src([`${paths.src.twig}/pages/*.twig`])
        .pipe(twigCompiler)
        .on('error', function (error) {
            notifier.notify({
                title: 'Twig Error Happened 😞',
                message: `Here is a problem: ${error.message}`
            });

            this.emit('end');
        })
        .pipe(gulp.dest(paths.app))
});

gulp.task('twig:default', ['twig:watch', 'twig:compile']);