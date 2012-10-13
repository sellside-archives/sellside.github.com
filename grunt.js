// Gruntfile for Theme: Boilerplate

module.exports = function(grunt) {
  
  // Project configuration
  grunt.initConfig({

    pkg: '<json:package.json>',
    meta: {
      banner: 
        '/* ==========================================================\n' +
        ' * <%= pkg.type %>-<%= pkg.name %> v<%= pkg.version %> \n' +
        ' * Website: <%= pkg.homepage %>\n' +
        ' * \n' +
        ' * Built <%= grunt.template.today("yyyy-mm-dd") %> with grunt v<%= grunt.version %>\n' +
        '/* ==========================================================\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= _.pluck(pkg.licenses,"type").join(", ") %> <%= _.pluck(pkg.licenses,"url").join(", ") %>\n' +
        ' * \n' +
        '/* ==========================================================\n' +
        ' */'
    },

    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>', 'assets/js/custom/*.js']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Paths
    project: {
      partials: 'assets/partials',
      pages:    'assets/pages',
      less:     'assets/less',
      css:      'assets/css',
      img:      'assets/img',
      js:       'assets/js'
    },

    // Concatenate 
    // -------------------------------------

    concat: {
      docs: {
        src: [
              '<%= project.js %>/jquery.js', 
              '<%= project.js %>/bootstrap/bootstrap.min.js', 
              '<%= project.js %>/plugins/*.js', 
              '<%= project.js %>/bootstrap/application.js', 
              '<%= project.js %>/prettify/prettify.js', 
              '<%= project.js %>/custom/*.js'
        ],
        dest: '<%= project.js %>/docs.js'
      },
      prod: {
        src: [
              '<%= project.js %>/jquery.js', 
              '<%= project.js %>/bootstrap/bootstrap.min.js', 
              '<%= project.js %>/plugins/*.js', 
              '<%= project.js %>/bootstrap/application.js', // for now leave application.js in, until overwritten with our own code
              '<%= project.js %>/prettify/prettify.js', 
              '<%= project.js %>/custom/*.js'
        ],
        dest: '<%= project.js %>/production.js'
      }
    },

    append: {
      html: {
        header: '<%= project.partials %>/head.html',
        footer: '<%= project.partials %>/footer.html',
        src: [
            '<%= project.pages %>/blog.html',
            '<%= project.pages %>/index.html',
            '<%= project.pages %>/about.html',
            '<%= project.pages %>/contact.html',
            '<%= project.pages %>/projects.html',
            '<%= project.pages %>/get-started.html'
        ],
        dest: '.'   // destination *directory*, unnecessary to specify paths twice
      }
    },


    // LESS 
    // -------------------------------------

    less: {
      docs: {
        options: {
         // paths: ['assets','<%= project.less %>','<%= project.less %>/tookit','<%= project.less %>/bootstrap'], // alternate include paths for imports, such as variables
          paths: ['assets','assets/less','assets/less/tookit','assets/less/bootstrap'], // alternate include paths for imports, such as variables
          yuicompress: false
        },
        files: {
          "<%= project.css %>/project-unlinted.css": ['assets/project.less']
        }
      },
      components: {
        options: {
          paths: ['assets','<%= project.less %>','<%= project.less %>/bootstrap','<%= project.less %>/toolkit'], // alternate include paths for imports, such as variables
          yuicompress: false
        },
        files: {
          "<%= project.css %>/alerts.css": ['<%= project.less %>/alerts.less'],
          "<%= project.css %>/buttons.css": ['<%= project.less %>/buttons.less']
        }
      },
      min: {
        options: {
          paths: ['assets/css'], 
          yuicompress: true
        },
        files: {
          "<%= project.css %>/project.min.css": ['<%= project.css %>/project.css']  // "assets/css/<%= kit.name %>-<%= kit.version %>.css": "assets/less/concat/<%= kit.name %>.less",
        }
      }
    },


    // RECESS
    // -------------------------------------

    recess: {
      pass: {
        src: '<%= project.css %>/project-unlinted.css',
        dest: '<%= project.css %>/project.css',
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
          stripColors: false,          // Strip colors from the Terminal output
          zeroUnits: true              // Doesn't complain if you add units to values of 0
        }
        // files: {
        //   "<%= project.css %>/project.css": ['<%= project.css %>/project-unlinted.css']  // "assets/css/<%= kit.name %>-<%= kit.version %>.css": "assets/less/concat/<%= kit.name %>.less",
        // }
      },
      minify: {
        src: '<%= project.css %>/project-unlinted.css',
        dest: '<%= project.css %>/project.css',
        options: {
          compile: true,               // Compiles CSS or LESS. Fixes white space and sort order
          compress: true,              // Compress your compiled code
          noIDs: true,                 // Doesn't complain about using IDs in your stylesheets
          noJSPrefix: true,            // Doesn't complain about styling .js- prefixed classnames
          noOverqualifying: true,      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
          noUnderscores: true,         // Doesn't complain about using underscores in your class names
          noUniversalSelectors: true,  // Doesn't complain about using the universal * selector
          prefixWhitespace: true,      // Adds whitespace prefix to line up vender prefixed properties
          strictPropertyOrder: true,   // Complains if not strict property order
          stripColors: false,          // Strip colors from the Terminal output
          zeroUnits: true              // Doesn't complain if you add units to values of 0
        }
      },
      fail: {
        src: '<%= project.css %>/project-unlinted.css'
      }
    },

    // Watch
    // -----

    watch: {
      docs: {
        files: [ 'assets/**/*.*' ], // 'less/.*\.less'
        tasks: 'append:html concat less:docs'
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }

  });


  grunt.registerMultiTask('append', 'Appends and prepends source files with specified header and footer', function() {
    var data = this.data,
        path = require('path'),
        dest = grunt.template.process(data.dest),
        files = grunt.file.expandFiles(this.file.src),
        header = grunt.file.read(grunt.template.process(data.header)),
        footer = grunt.file.read(grunt.template.process(data.footer)),
        sep = grunt.utils.linefeed; 

    files.forEach(function(f) {
        var p = dest + '/' + path.basename(f),
            contents = grunt.file.read(f);

        grunt.file.write(p, header + sep + contents + sep + footer);
        grunt.log.writeln('File "' + p + '" created.');
    });
  });


  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib');

  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'less nodeunit'); 

  // By default, lint and run all tests.
  grunt.registerTask('default', 'append:html concat:prod less:docs recess:pass watch');
  grunt.registerTask('components', 'append:html concat:components less:components');
  grunt.registerTask('min', 'append:html concat less:docs recess:minify watch');

};