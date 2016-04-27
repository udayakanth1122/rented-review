'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('tslint', function() {
  return gulp.src(path.join(conf.paths.clientSrc, '/app/**/*.ts'))
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});

gulp.task('scripts-reload', ['tslint'], function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', ['tslint'], function() {
  return buildScripts();
});

function buildScripts() {
  var tsProject = ts.createProject('tsconfig.json');

  var tsResult = tsProject.src() // instead of gulp.src(...)
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({
      stream: true
    }));
};
