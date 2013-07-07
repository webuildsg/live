module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      assets: ['style.css']
    },
    compass: {
      production: {
        options: {
          sassDir: 'sass',
          cssDir: '/',
          fontsDir: 'fonts',
          outputStyle: 'compressed',
          noLineComments: true
        }
      }
    },
    watch: {
      styles: {
        files: ['sass/*'],
        tasks: ['sass:production']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'watch']);

};
