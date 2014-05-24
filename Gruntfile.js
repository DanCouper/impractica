// module.exports refers to the object
// that is returned by a Nodejs `require` call.
// (commonjs syntax).
module.exports = function(grunt) {
  // Use global strict for Gruntfile; no 3rd party issues.
  'use strict';
  // load all grunt tasks: this loads from node_modules
  // and removes the need to manually specify
  // (or forget to specify) installed tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: {
          'test/prism-impractica.css' : 'src/stylus/prism-impractica.styl'
        }
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          'test/index.html' : 'src/jade/index.jade'
        }
      }
    },

    watch: {
      options: {
        spawn: false,         // No child processeds spawned. Faster, but can cause watch to fail.
        debounceDelay: 2000,  // Delay in watch reacting to in-file changes.
        livereload: true      // Opens LR server on default port (35729).
      },
      stylus: {
        files: ['src/stylus/*.styl'],
        tasks: ['stylus']
      },
      jade: {
        files: ['src/jade/*.jade'],
        tasks: ['jade']
      }
    },
    // Connect is an HTTP server framework for Node
    // The connect task provides a static file server for developing.
    connect: {
      server: {
        options: {
          // port: ,           // Match Middleman's default port for consistency's sake.
          base: 'test/',        // Base directory to serve files from.
          livereload: true,     // livereload injects the script, watch task needed to actually use it.
          open: true            // Automatically open a browser window.
        }
      }
    }

  }); // end grunt.initConfig

  grunt.registerTask('default', ['stylus', 'jade', 'connect', 'watch']);

}; // end module