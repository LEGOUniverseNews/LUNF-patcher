module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/* <%= pkg.name %> v<%= pkg.version %>\n" +
    " * <%= pkg.homepage ? '' + pkg.homepage + '\\n' : '' %>" +
    " * Created 2013-<%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
    " * Licensed under the <%= pkg.license %>\n */\n",

    devUpdate: {
      main: {
        options: {
          reportUpdated: false,
          updateType: "prompt",
          packages: {
            devDependencies: true,
            dependencies: true
          }
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: "node_modules/",
            src: ["perfect-scrollbar/min/perfect-scrollbar.min.css",
                  "perfect-scrollbar/min/perfect-scrollbar.min.js"],
            dest: "lib/"
          }
        ]
      }
    },

    htmlhint: {
      html: {
        options: {
          "tag-pair": true
        },
        src: ["index.html"]
      }
    },

    csslint: {
      strict: {
        options: {
          csslintrc: ".csslintrc",
          "import": 2
        },
        src: "css/style.css"
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: "<%= banner %>"
        },
        files: {
          "css/<%= pkg.name %>.min.css": ["css/style.css"]
        }
      }
    },

    jshint: {
      files: ["js/*.js", "!js/*.min.js"],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    uglify: {
      options: {
        banner: "<%= banner %>",
        compress: {
          drop_console: true
        },
        mangle: true,
        report: "min",
        sourceMap: false
      },
      my_target: {
        files: {
          "js/newsfeed.min.js": "js/newsfeed.js"
        }
      }
    },

    // Watched files to trigger grunt
    watch: {
      files: ["package.json", "index.html", "css/style.css", "<%= jshint.files %>"],
      tasks: ["all"]
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
  grunt.registerTask("build", ["cssmin", "uglify", "copy"]);
  grunt.registerTask("all", ["lint", "build"]);

  // Always use --force to stop csslint from killing the task
  grunt.option("force", true);
};
