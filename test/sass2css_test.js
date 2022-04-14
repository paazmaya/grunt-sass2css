/**
 * grunt-sass2scss
 * https://github.com/paazmaya/grunt-sass2scss
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */


const grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.sass2css = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  defaultOptions: function(test) {
    test.expect(1);

    const actual = grunt.file.read('tmp/default-1.scss');
    const expected = grunt.file.read('test/expected/default-1.scss');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },

  prettyKeep: function(test) {
    test.expect(1);

    const actual = grunt.file.read('tmp/pretty-keep-1.scss');
    const expected = grunt.file.read('test/expected/pretty-keep-1.scss');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },

  expandedVeryPretty: function(test) {
    test.expect(1);

    const actual = grunt.file.read('tmp/styles-2.very-pretty.scss');
    const expected = grunt.file.read('test/expected/styles-2.very-pretty.scss');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },

  justSourceConvert: function(test) {
    test.expect(1);

    const actual = grunt.file.read('test/fixtures/styles-2.scss');
    const expected = grunt.file.read('test/expected/styles-2.convert.scss');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },

  directoryStrip: function(test) {
    test.expect(1);

    const actual = grunt.file.read('tmp/styles-3.scss');
    const expected = grunt.file.read('test/expected/styles-3.strip.scss');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  }

};
