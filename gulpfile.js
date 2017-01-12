var gulp = require('gulp');
var	concat = require('gulp-concat');
var	cssnano = require('gulp-cssnano');
var	clean = require('gulp-clean');
var	browserSync = require('browser-sync').create();
var	autoprefixer = require('gulp-autoprefixer');
var	rename = require ('gulp-rename');
var	postcss = require('gulp-postcss');
var	assets = require ('postcss-assets');
var	short = require('postcss-short');
var	concat = require('gulp-concat');
var handlebars = require('gulp-compile-handlebars');

gulp.task('default', ['dev']);
gulp.task('dev', ['build-dev', 'browser-sync', 'watch']);

gulp.task('build-dev', ['html', 'css-dev', 'assets', 'scripts', 'handlebars']);

gulp.task('css-dev', function () {
	var processors = [
	short,
	assets ({
		loadPaths: ['src/assets/img'],
		relativTo: 'src/styles'
	}),
	];
	return gulp.src('./src/styles/*.css')
		.pipe(concat('styles.css'))
		.pipe(postcss(processors))
		.pipe(rename('styleOut.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./build/styles/'))
});

gulp.task('html', function () {
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./build/'));
});

gulp.task('browser-sync', function () {
	return browserSync.init({
		server: {
			baseDir: './build/'
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('./src/styles/*.css', ['css-dev']);
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/**/*.*', browserSync.reload);
	gulp.watch('./src/scripts/*.js',['scripts']);
});

gulp.task('assets', function() {
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest('./build/assets/'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/scripts/*.js')
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./build/scripts/'));
});

gulp.task('handlebars', function () {
	var options = {
		batch : ['./src/partials/']
	};
	return gulp.src('./src/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(rename('hello.html'))
		.pipe(gulp.dest('./build/'));
});