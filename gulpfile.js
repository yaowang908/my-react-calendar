// https://www.labnol.org/code/bundle-react-app-single-file-200514

const gulp = require('gulp')
const inlinesource = require('gulp-inline-source')
const replace = require('gulp-replace')

gulp.task('default', () => {
    return gulp.src('./build/index.html')
        .pipe(replace('.js"></script>', '.js" inline></script>'))
        .pipe(replace('.js" async=""></script>', '.js" async="" inline></script>'))
        .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
        .pipe(replace('<link rel="stylesheet"', '<link rel="stylesheet" inline'))
        .pipe(inlinesource({
            compress: false,
            ignore: ['png']
        }))
        .pipe(gulp.dest('./single_html'))
});