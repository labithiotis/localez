var gulp = require('gulp'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
  connect = require('gulp-connect'),
	plumber = require('gulp-plumber');

gulp.task('build', function() {
	return gulp
		.src('./src/locale.js')
		.pipe(plumber({
			errorHandler: function(err) {
				err.message = err.message.replace(__dirname + '/src/', '');
				notify.onError({
					title: 'Gulp Failure❗️',
					message: '<%= error.message %>',
					sound: 'Beep',
				})(err);
				this.emit('end')
			},
		}))
		.pipe(babel())

		//.pipe(uglify())
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./test/browser'))
    .pipe(connect.reload())
		.pipe(notify({
			title: ('Babel Compile'),
			message: 'Successfully compiled 😃',
			onLast: true,
			wait: true,
		}))
})

gulp.task('connect', function() {
  connect.server({
		root: './test/browser',
    port: '8888',
    livereload: true,
  })
})

gulp.task('watch', function() {
	gulp.watch(['./src/**/*'], ['build'])
})

gulp.task('default', ['build','connect','watch'])
