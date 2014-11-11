var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('sass', function () {
    gulp.src('./assets/sass/style.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass()).on('error', $.notify.onError(function (error) {
            return 'Sass error: ' + error.message;
        }))
        .pipe($.sourcemaps.write({includeContent: false}))
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.pleeease({mqpacker: false})) // Disable mqpacker because of https://github.com/hail2u/node-css-mqpacker/issues/16
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
    ;
});

gulp.task('coffee', function () {
    gulp.src('./assets/coffee/*.coffee')
        .pipe($.sourcemaps.init())
        .pipe($.coffee()).on('error', $.notify.onError(function (error) {
            return 'Coffee error: ' + error.message;
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('js', function () {
    gulp
        .src([
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-cookie/angular-cookie.min.js',
            './bower_components/firebase/firebase.js',
            './bower_components/angularfire/dist/angularfire.min.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
            './bower_components/lodash/dist/lodash.min.js'
        ])
        .pipe($.uglifyjs('vendor.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('templates', function () {
    gulp
        .src('./assets/templates/**')
        .pipe(gulp.dest('./public/templates'));
});

gulp.task('fonts', function () {
    gulp.src('./bower_components/fontawesome/fonts/*')
        .pipe(gulp.dest('./public/fonts'))
});

gulp.task('watchOnly', function () {
    $.livereload.listen();
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/coffee/**/*.coffee', ['coffee']);
    gulp.watch('./assets/templates/**', ['templates']);
    gulp
        .watch('./public/**')
        .on('change', $.livereload.changed);
});

gulp.task('watch', ['default', 'watchOnly']);
gulp.task('default', ['fonts', 'templates', 'js', 'sass', 'coffee']);