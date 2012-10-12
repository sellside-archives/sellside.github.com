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
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>', 'assets/js/*.js']
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
    // -----------

    concat: {

      extras: {
        src: ['<%= project.js %>/bootstrap/application.js', '<%= project.js %>/custom.js'],
        dest: '<%= project.js %>/project.js'
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

    // Less
    less: {
      theme: {
        options: {
          paths: ['assets','assets/css','assets/less'], // alternate include paths for imports, such as variables
          yuicompress: false,
          compress: false
        },
        files: {
          "assets/css/project.css": ['assets/project.less']
        }
      }
    },

    // Watch
    // -----

    watch: {
      files: [ '<config:lint.files>', 'assets/**/*.*' ], // 'less/.*\.less'
      tasks: 'concat less'
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
  grunt.loadTasks('../node_modules/tasks');

  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');

  // grunt.registerTask('test', 'clean less nodeunit');
  grunt.registerTask('test', 'less nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'append concat less');

};