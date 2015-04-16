/**
 * grunt-sass2scss
 * https://github.com/paazmaya/grunt-sass2scss
 *
 * Copyright (c) Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

module.exports = function exportGrunt(grunt) {

  grunt.registerMultiTask('sass2scss', 'Convert Sass files to SCSS files with sass2scss', function register() {

    var options = this.options({
      binPath: 'sass2scss',
      args: []
    });
    var done = this.async();
    var mapList = [];

    // Add possibly missing dashes, since they are mentioned as optional
    options.args = options.args.map(function missingDashes(item) {
      if (item.indexOf('-') === 0) {
        return item;
      }
      if (item.length === 1) {
        return '-' + item;
      }

      return '--' + item;
    });


    var executor = function executor(map) {
      grunt.log.verbose.writeln('Converting file: ' + map.src);

      var command = [options.binPath].concat(
        options.args, ['<', map.src]
      ).join(' ');
      exec(command, function spawnDone(error, stdout) {
        if (error) {
          grunt.log.warn('Failure with sass2scss. ' + error);
        }
        else {
          grunt.file.write(map.dest, stdout, 'utf8');
        }
        iterate();
      });
    };

    var iterate = function iterate() {
      if (mapList.length === 0) {
        done();
        return;
      }
      var map = mapList.shift();
      executor(map);
    };

    this.files.forEach(function eachFiles(f) {
      var src = f.src.filter(function filterSrc(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });

      src.forEach(function eachSrc(source) {

        var destination = f.dest;
        if (typeof destination !== 'string') {
          // Assume that destination to be written next to source
          destination = source.replace(/\.sass$/, '.scss');
        }
        else if (destination.indexOf('.scss') === -1) {
          // Assume it is a directory
          destination = destination + '/' + source.split('/').pop().replace(/\.sass$/, '.scss');
        }

        mapList.push({src: source, dest: destination});
      });
    });

    iterate();

  });

};
