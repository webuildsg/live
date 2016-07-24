module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
        // compress: false,
        // beautify: true
      },
      production: {
        files: {
          'script.js': [
            'js/lib/fluidvids/dist/fluidvids.js',
            'js/lib/moment/min/moment.min.js',
            'js/lib/prism/prism.js',

            'js/modernizr.js',
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
    'jscs',
    'jshint',
    'uglify'
  ]);

  grunt.registerTask('watching', [
    'jscs',
    'jshint',
    'uglify',
    'watch'
  ]);
};
