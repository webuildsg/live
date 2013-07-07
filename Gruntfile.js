module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      assets: ['style.css']
    },
    sass: {
      optimized: {
        options: {
          style: 'compressed',
          lineNumbers: false
        },
        files: {
          'style.css': 'sass/style.sass'
        }
      }
    },
    watch: {
      styles: {
        files: ['sass/style.sass'],
        tasks: ['sass:optimized']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'watch']);

};
