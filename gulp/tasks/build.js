import gulp from 'gulp';
import color from 'gulp-color';

gulp.task('build', () => {
    console.log(color('Command gulp:build is deprecated!\nYou have to use gulp build:dev or gulp build:prod', 'red'));
});

gulp.task('build:dev', [
    'stylus:build:dev',
    'scripts:build:dev',
    'sprite-svg:create',
]);

gulp.task('build:prod', [
    'stylus:build:prod',
    'scripts:build:prod',
    'sprite-svg:create',
]);
