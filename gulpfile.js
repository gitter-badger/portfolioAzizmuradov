var gulp = require('gulp'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require ('gulp-rename'),
	postcss = require('gulp-postcss'),
	assets = require ('postcss-assets'),
	short = require('postcss-short');

gulp.task('default', ['dev']);
gulp.task('dev', ['build-dev', 'browser-sync', 'watch']);

gulp.task('build-dev', ['html', 'css-dev', 'assets', 'scripts']);

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