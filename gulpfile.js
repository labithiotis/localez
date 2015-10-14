var gulp = require('gulp'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
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
		.pipe(uglify())
		.pipe(gulp.dest('./dist'))
		.pipe(notify({
			title: ('Babel Compile'),
			message: 'Successfully compiled 😃',
			onLast: true,
			wait: true,
		}))
})

gulp.task('watch', function() {
	gulp.watch(['./src/**/*'], ['build'])
})
