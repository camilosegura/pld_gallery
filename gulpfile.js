var gulp = require('gulp');

var jshint = require('gulp-jshint');

var changed = require('gulp-changed');

var imagemin = require('gulp-imagemin');

var minifyHTML = require('gulp-minify-html');

var concat = require('gulp-concat');

var stripDebug = require('gulp-strip-debug');

var uglify = require('gulp-uglify');

var autoprefix = require('gulp-autoprefixer');

var minifyCSS = require('gulp-minify-css');

gulp.task('jshint', function(){
	gulp.src('./src/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function(){
	var imgSrc = './src/img/**/*',
		imgDst = './build/img';
	
	gulp.src(imgSrc)
	    .pipe(changed(imgDst))
	    .pipe(imagemin())
	    .pipe(gulp.dest(imgDst));
});

gulp.task('htmlpage', function(){
	var htmlSrc = './src/*.html',
	    htmlDst = './build';
	
	gulp.src(htmlSrc)
	    .pipe(changed(htmlDst))
	    .pipe(minifyHTML())
	    .pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function(){
	gulp.src('./src/js/*.js')
	    .pipe(concat('script.js'))
	    .pipe(stripDebug())
	    .pipe(uglify())
	    .pipe(gulp.dest('./build/js/'));
});


gulp.task('styles', function(){
	gulp.src(['./src/css/*.css'])
	    .pipe(concat('styles.css'))
	    .pipe(autoprefix('las 2 versions'))
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('./build/css/'));
});

gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function(){
	gulp.watch('./src/*.html', function(){
		gulp.run('htmlpage');
	});
	
	gulp.watch('./src/js/*.js', function(){
		gulp.run('jshint', 'scripts');
	});
	
	gulp.watch('./src/css/*.css', function(){
		gulp.run('styles');
	});
});