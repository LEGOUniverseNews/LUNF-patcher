module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Keep the devDependencies up-to-date
    devUpdate: {
      main: {
        options: {
          // Do not mention already updated dependencies
          reportUpdated: false,
          // Prompt asking if the dependency should be updated
          updateType : "prompt"
        }
      }
    },
    
    // Copy dependencies to the proper location
    copy: {
      main: {
        expand: true,
        cwd: "node_modules/",
        src: ["string-format/lib/*"],
        dest: "js/",
        flatten: true,
        filter: "isFile"
      },
    },

    // Lint the HTML using HTMLHint
    htmlhint: {
      html: {
        options: {
          "tag-pair": true,
        },
        src: ["index.html"]
      }
    },

    // Lint the CSS using CSS Lint
    csslint: {
      strict: {
        options: {
          csslintrc: ".csslintrc",
          "import": 2
        },
        src: "css/style.css",
      }
    },

    // Minify any CSS
    cssmin: {
      add_banner: {
        options: {
          banner: "/* Created 2013-2014 Triangle717 & rioforce, licensed under The MIT License */"
        },
        files: {
          "css/<%= pkg.name %>.min.css": ["css/style.css"]
        }
      }
    },

    // Lint check any JavaScript
    jshint: {
      files: ["package.json", "Gruntfile.js", "js/script.js"],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    // Watched files to trigger grunt
    watch: {
      files: ["index.html", "css/style.css", "<%= jshint.files %>"],
      tasks: ["default"]
    }
  });

  // Load all the plugins required to perform our tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', 'List commands', function () {
    grunt.log.writeln("");
    grunt.log.writeln('Run "grunt lint" to lint the source files');
    grunt.log.writeln('Run "grunt build" to minify the source files');
    grunt.log.writeln('Run "grunt devUpdate" to update the devDependencies');
    grunt.log.writeln('Run "grunt all" to run all tasks except "devUpdate"');
  });

  // Define the tasks
  grunt.registerTask("lint", ["htmlhint", "csslint", "jshint"]);
  grunt.registerTask("build", ["cssmin", "copy"]);
  grunt.registerTask("all", ["lint", "build"]);

  // Always use --force to stop csslint from killing the task
  grunt.option("force", true);
};
