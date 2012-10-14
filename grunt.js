/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    less: {
      main: {
        options: {
          paths: ['assets/less'],
          yuicompress: false
        },
        files: {
          "assets/css/project.css": ['assets/project.less']
        }
      },
      test: {
        options: {
          paths: ['tests/less'],
          yuicompress: false
        },
        files: {
          "tests/css/project.css": ['tests/less/project.less']
        }
      }
    },

    recess: {
      src: 'assets/project.less',
      dest: 'assets/css/project.css',
      options: {
          compile: true,               // Compiles CSS or LESS. Fixes white space and sort order
          compress: false,             // Compress your compiled code
          noIDs: true,                 // Doesn't complain about using IDs in your stylesheets
          noJSPrefix: true,            // Doesn't complain about styling .js- prefixed classnames
          noOverqualifying: true,      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
          noUnderscores: true,         // Doesn't complain about using underscores in your class names
          noUniversalSelectors: true,  // Doesn't complain about using the universal * selector
          prefixWhitespace: true,      // Adds whitespace prefix to line up vender prefixed properties
          strictPropertyOrder: true,   // Complains if not strict property order
          stripColors: true,           // Strip colors from the Terminal output
          zeroUnits: true              // Doesn't complain if you add units to values of 0          
      }
    },

    watch: {
      less: {
        files: ['assets/project.less','assets/less/**/*.less'], 
        tasks: 'less:main'
      },
      scripts: {
        files: 'assets/js/**/*.js',
        tasks: 'lint test'
      },
      test: {
        files: 'tests/less/*.less', 
        tasks: 'less:test'
      }
    },

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib');

  // Default task.
  grunt.registerTask('default', 'less:main watch:less watch:scripts');
  grunt.registerTask('test', 'less:test watch:test');
  grunt.registerTask('recess', 'recess watch:less');

};
