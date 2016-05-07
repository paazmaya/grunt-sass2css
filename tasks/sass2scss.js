/**
 * grunt-sass2scss
 * https://github.com/paazmaya/grunt-sass2scss
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 * Licensed under the MIT license.
 */

'use strict';

const exec = require('child_process').exec;

module.exports = function exportGrunt(grunt) {

  grunt.registerMultiTask('sass2scss', 'Convert Sass files to SCSS files with sass2scss', function register() {

    const options = this.options({
      binPath: 'sass2scss',
      args: []
    });
    const done = this.async();
    const mapList = [];

    // Add possibly missing dashes, since they are mentioned as optional
    options.args = options.args.map((item) => {
      if (item.indexOf('-') === 0) {
        return item;
      }
      if (item.length === 1) {
        return '-' + item;
      }

      return '--' + item;
    });


    const executor = function (map) {
      grunt.log.verbose.writeln('Converting file: ' + map.src);

      const command = [options.binPath].concat(
        options.args, ['<', map.src]
      ).join(' ');
      exec(command, (error, stdout) => {
        if (error) {
          grunt.log.warn('Failure with sass2scss. ' + error);
        }
        else {
          grunt.file.write(map.dest, stdout, 'utf8');
        }
        iterate();
      });
    };

    const iterate = function () {
      if (mapList.length === 0) {
        done();
        return;
      }
      const map = mapList.shift();
      executor(map);
    };

    this.files.forEach((f) => {
      const src = f.src.filter((filepath) => {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });

      src.forEach((source) => {

        let destination = f.dest;
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
