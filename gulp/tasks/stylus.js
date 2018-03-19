import gulp from 'gulp';
import stylus from 'gulp-stylus';
import concat from 'gulp-concat';
import rupture from 'rupture';
import lineClamping from 'line-clamping.styl';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import pxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import gutil from 'gulp-util';
import notifier from 'node-notifier';
import paths from '../paths';
import save from 'gulp-save';
import clean from 'gulp-clean';
import gaze from 'gaze';

const compilerErrorHandler = (error) => {
    notifier.notify({
        title: 'Stylus Error Happened 😞',
        message: `Here is a problem: ${error.message}`
    });
}

const postcssOptions = [
    autoprefixer({
        browsers: ['last 2 versions', 'ie 10', 'android 4']
    }),
    pxToRem({
        propWhiteList: [
            'font',
            'font-size',
            'line-height',
            'letter-spacing',

            'border',
            'border-left',
            'border-right',
            'border-bottom',
            'border-top',
            'border-width',
            'border-spacing',

            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-left-radius',
            'border-bottom-right-radius',

            'outline',

            'width',
            'height',

            'min-width',
            'min-height',

            'max-width',
            'max-height',

            'padding',
            'padding-top',
            'padding-bottom',
            'padding-left',
            'padding-right',

            'margin',
            'margin-top',
            'margin-bottom',
            'margin-left',
            'margin-right',

            'top',
            'bottom',
            'right',
            'left',

            'box-shadow',
            'text-shadow',
        ],
        selectorBlackList: [
            'html',
            'ul:not([class]) > li:before',
            '.list-default > li:before',
            '.list-numeric > li:before',
            'ol:not([class]) > li:before'
        ],
        mediaQuery: true,
        minPixelValue: 3
    })
];

gulp.task('stylus:watch', () => {
    return gaze([`${paths.src.stylus}/**/*.styl`], function(event, filepath) {
         // On changed/added/deleted
        this.on('all', (event, filepath) => {
            gulp.start('stylus:build:dev');
        });

        this.on('added', (filepath) => {
            notifier.notify({
                title: 'Stylus Compiler Information',
                message: `File ${filepath} was added to stylus watch`
            });
        });

        this.on('deleted', (filepath) => {
            notifier.notify({
                title: 'Stylus Compiler Information',
                message: `File ${filepath} was deleted from stylus watch`
            });
        });
    });
});

gulp.task('stylus:clean', () => {
    return gulp.src(`${paths.dist.css}/*.map`)
        .pipe(clean({
            force: true,
        }));
});

gulp.task('stylus:build:dev', () => {
    const stylusCompiler = stylus({
        use: [rupture(), lineClamping()],
        'include css': true
    }).on('error', (e) => {
        gutil.log(e);
        stylusCompiler.end();
    });

    return gulp
        .src([`${paths.src.stylus}/main.styl`])
        .pipe(sourcemaps.init())
        .pipe(stylusCompiler)
        .on('error', compilerErrorHandler)
        .pipe(postcss(postcssOptions))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {
            sourceMappingURLPrefix: '/bundles/app/css'
        }))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('stylus:build:prod', ['stylus:clean'], () => {
    const stylusCompiler = stylus({
        use: [rupture(), lineClamping()],
        'include css': true
    }).on('error', (e) => {
        gutil.log(e);
        stylusCompiler.end();
    });
    
    return gulp
        .src([`${paths.src.stylus}/main.styl`])
        .pipe(stylusCompiler)
        .on('error', compilerErrorHandler)
        .pipe(postcss(postcssOptions))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('stylus:default', [
    'stylus:build:dev',
    'stylus:watch',
]);
