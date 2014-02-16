module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      assets: ['style.css']
    },
    compass: {
      production: {
        options: {
          specify: 'sass/style.sass',
          cssPath: './',
          outputStyle: 'compressed',
          noLineComments: true
        }
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      production: {
        files: {
          'script.js': [ 'js/moment.js', 'js/prism.js', 'js/modernizr.js','js/script.input.js']
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'script.input.js']
    },
    watch: {
      styles: {
        files: ['sass/**/*.scss', 'sass/**/*.sass'],
        tasks: ['compass:production']
      },
      script: {
        files: ['js/script.input.js'],
        tasks: ['uglify:production']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['clean', 'compass','jshint', 'uglify', 'watch']);

};
