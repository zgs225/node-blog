module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'public/javascripts/application.min.js': ['public/javascripts/application.js']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'public/javascripts/application.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/stylesheets/style.min.css': ['public/stylesheets/style.css']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
};