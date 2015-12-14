module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      development: {
        options: {
          dest: 'www/js/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://localhost:4567'
          }
        }
      },
      production: {
        options: {
          dest: 'www/js/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://infinite-inlet-6468.herokuapp.com/'
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true
      },
      build: {
        files: {
          'www/js/app.min.js': ['lib/ionic/js/ionic.bundle.js', 'js/vendor/jquery.min.js', 'js/vendor/jquery.flexslider.min.js', 'js/app.js', 'js/config.js', 'js/controllers.js', 'js/services.js', 'js/services/posts.js', 'js/services/categories.js'],
          'www/css/app.min.css': ['css/vendor/bootstrap.min.css', 'css/vendor/flexslider.css', 'css/style.css', 'css/flexslider-theme.css', 'css/fonts.css', 'css/cid.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-constant');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  
  grunt.registerTask('build', [
    'uglify',
    'ngconstant:production'
  ]);

};