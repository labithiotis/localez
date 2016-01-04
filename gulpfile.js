var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    gulpRename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');

var config = {
    PRODUCTION: false,
    PORT: 8080,
    SRC_DIR: 'src/',
    BUILD_DIR: './',
    SRC_FILE: 'localez.js',
    BUILD_FILE: 'localez.js',
    src: function (path) {
        return path ? this.SRC_DIR + path : this.SRC_DIR;
    },
    dest: function (path) {
        return path ? this.BUILD_DIR + path : this.BUILD_DIR;
    },
    errorHandler(err) {
        err.message = err.message.replace(__dirname + '/src/', '');
        notify.onError({
            title: 'Gulp Failure❗️',
            message: '<%= error.message %>',
            sound: 'Beep',
            icon: 'https://dl.dropboxusercontent.com/u/2175584/personal/gulp/gulp.png'
        })(err);
        this.emit('end');
    }
};

gulp.task('build', function () {

    return browserify({debug: false})
        .transform(babelify)
        .require(config.src(config.SRC_FILE), {entry: true})
        .bundle()
        .on('error', config.errorHandler)
        .pipe(source(config.BUILD_FILE))
        .pipe(buffer())
        .pipe(gulpIf(config.PRODUCTION, uglify()))
        .pipe(gulpRename(config.BUILD_FILE))
        .pipe(gulp.dest(config.dest()))
        .pipe(gulp.dest(config.dest('test/browser')))
        .pipe(notify({
            title: ('Babel Compile'),
            message: 'Successfully compiled 😃',
            onLast: true,
            wait: true
        }))

})

gulp.task('watch', function () {
    browserSync({
        port: config.PORT,
        browser: 'google chrome',
        notify: true,
        server: {
            baseDir: './test/browser'
        }
    });
    gulp.watch(['./src/**/*'], ['build'])
})

gulp.task('default', ['build', 'watch'])
