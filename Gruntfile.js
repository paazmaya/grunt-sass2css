/**
 * grunt-sass2scss
 * https://github.com/paazmaya/grunt-sass2scss
 *
 * Copyright (c) Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function exportGrunt(grunt) {

  grunt.initConfig({
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    clean: {
      tests: ['tmp', 'test/fixtures/*.scss']
    },

    sass2scss: {
      // All multi task items shall have the same binPath
      options: {
        binPath: 'sass2scss'
      },

      defaultOptions: {
        files: {
          'tmp/default-1.scss': ['test/fixtures/styles-1.sass']
        }
      },

      prettyKeep: {
        options: {
          args: [
            'pretty',
            'keep'
          ]
        },
        files: {
          'tmp/pretty-keep-1.scss': ['test/fixtures/styles-1.sass']
        }
      },

      expandedVeryPretty: {
        options: {
          args: [
            'p',
            'p',
            'p'
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/',
            src: ['*.sass'],
            dest: 'tmp/',
            ext: '.very-pretty.scss'
          }
        ]
      },

      justSourceConvert: {
        options: {
          args: [
            'convert'
          ]
        },
        src: ['test/fixtures/*.sass']
      },

      directoryStrip: {
        options: {
          args: [
            'strip'
          ]
        },
        files: {
          'tmp/': ['test/fixtures/styles-3.sass']
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['eslint', 'clean', 'sass2scss', 'nodeunit']);
  grunt.registerTask('default', ['test']);
};
