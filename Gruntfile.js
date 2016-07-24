module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      assets: [
        'js/moment.js'
      ]
    },

    copy: {
      main: {
        files: [
          {
            expand: false,
            src: [ 'js/lib/moment/min/moment.min.js' ],
            dest: 'js/moment.js',
            filter: 'isFile'
          },
          {
            expand: false,
            src: [ 'js/lib/fluidvids/dist/fluidvids.min.js' ],
            dest: 'js/fluidvids.js',
            filter: 'isFile'
          },
          {
            expand: false,
            src: [ 'js/lib/prism/prism.js' ],
            dest: 'js/prism.js',
            filter: 'isFile'
          }
        ]
      }
    },

    uglify: {
      options: {
        mangle: true
        // compress: false,
        // beautify: true
      },
      production: {
        files: {
          'script.js': [
            'js/moment.js',
            'js/prism.js',
            'js/modernizr.js',
            'js/fluidvids.js',
            'js/script.input.js'
          ]
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'js/script.input.js'
      ]
    },

    jscs: {
      src: [
        'Gruntfile.js',
        'js/script.input.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    watch: {
      script: {
        files: [ 'js/script.input.js' ],
        tasks: [ 'uglify:production' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'jscs',
    'jshint',
    'uglify'
  ]);

  grunt.registerTask('watching', [
    'clean',
    'copy',
    'jscs',
    'jshint',
    'uglify',
    'watch'
  ]);
};
