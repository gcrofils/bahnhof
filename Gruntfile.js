module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'bahnhof.config',
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
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'www/css/app.min.css': ['www/css/vendor/bootstrap.css', 'www/css/vendor/flexslider.css', 'www/css/style.css', 'www/css/flexslider-theme.css', 'www/css/fonts.css', 'www/css/cid.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true, 
        beautify : true,
        mangle   : false
      },
      build: {
        files: {
          'www/js/app.min.js': ['www/js/app.js', 'www/js/config.js', 'www/js/controllers.js', 'www/js/services.js', 'www/js/services/posts.js', 'www/js/services/categories.js']
        }
      }
    }
  });

          
        
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ng-constant');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  
  grunt.registerTask('build', [
    'ngconstant:production',
    'uglify',
    'cssmin'
  ]);

};