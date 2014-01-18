module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Minify any CSS
    cssmin: {
      add_banner: {
        options: {
          banner: "/* Created 2013-2014 Triangle717 & rioforce, licensed under The MIT License */"
        },
        files: {
          "css/stylesheet.min.css": ["css/stylesheet.css"]
        }
      }
    },

    // Lint check any JavaScript
    jshint: {
      files: ["package.json", "gruntfile.js", "js/script.js"],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    // Watched files to trigger grunt
    watch: {
      files: ["index.html", "css/stylesheet.css", "<%= jshint.files %>"],
      tasks: ["default"]
    }
  });

  // Load any plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Define our tasks.
  grunt.registerTask("default", ["cssmin", "jshint"]);
};
