'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function() {

  gulp.watch([path.join(conf.paths.clientSrc, '/*.html'), 'bower.json'], ['inject-reload']);

  gulp.watch(path.join(conf.paths.clientSrc, '/app/**/*.css'), function(event) {
    if (isOnlyChange(event)) {
      browserSync.reload(event.path);
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.clientSrc, '/app/**/*.ts'), function(event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.clientSrc, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
