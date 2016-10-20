var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// We need to set up an error handler (which gulp-plumber calls).
// Otherwise, Gulp will exit if an error occurs, which is what we don't want.
var onError = function( err ) {
  console.log( 'An error occured:', err );
  this.emit( 'end' );
}


gulp.task('sass', function() {
	gulp.src('scss/master.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 version', 'safari 5', 'ie 8', 'opera 12.1', 'ios 6', 'android 4']
		  }))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('css/'));

	// Pour minimifier css avec SASS
	gulp.src('scss/master.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 version', 'safari 5', 'ie 8', 'opera 12.1', 'ios 6', 'android 4']
		  }))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('css/'));

});

gulp.task( 'server', function() {
	// Recompile sass into CSS whenever we update any of the source files
	gulp.watch('scss/partials/*.scss', ['sass']);
});
