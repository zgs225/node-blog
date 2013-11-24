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
    },
    less: {
      production: {
        options: {
          cleancss: true
        },
        files: {
          'public/stylesheets/style.css': ['public/stylesheets/style.less']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['jshint', 'less', 'uglify', 'cssmin']);
};