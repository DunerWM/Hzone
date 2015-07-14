
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand : true,
        cwd : 'public/src',
        src: '**/*.js',
        dest: 'public/build/'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/build/css/public.css': 'public/src/css/public.scss'
        }
      }
    },
    watch: {
      options: {
        atBegin: true // 启动后立即执行触发任务
      },
      styles: {
        files: ['public/src/**/*.scss'],
        tasks: ['sass','copy:styles']
      },
      scripts: {
        files: ['public/src/**/*.js'],
        tasks: ['copy:scripts','jshint:debug']
      },
      images : {
        files: ['public/src/images/*.{jpg,png,gif}'],
        tasks: ['copy:images']
      }
    },
    copy : {
      scripts : {
        files : [
          {
            expand : true,
            cwd : 'public/src',
            src : ['**/*.js'],
            dest : 'public/build/'
          }
        ]
      },
      styles : {
        files : [
          {
            expand : true,
            cwd : 'public/build',
            src : ['**/*.css'],
            dest : 'public/src/'
          }
        ]
      },
      images : {
        files : [{
          expand : true,
          cwd : 'public/src',
          src : ['**/*.{jpg,png,gif}'],
          dest : 'public/build/'
        }]
      }
    },
    clean : {
      all : 'public/build/**/*.js'
    },
    jshint : {
      debug : {
        files : {
          src : ['public/src/**/*.js']
        }
      },
      build : {
        files : {
          src : ['public/build/**/*.js']
        }
      }
    },
    imagemin : {
      dynamic : {
        files : [
          {
            expand : true,
            cwd : 'public/src',
            src : ['**/*.{jpg,png,gif}'],
            dest : 'public/build/'
          }
        ]
      }
    },
    cssmin : {
      target : {
        files : [{
          expand : true,
          cwd : 'public/src',
          src : ['**/*.css'],
          dest : 'public/build/'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Load the plugin that provides the "imagemin" task.
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  //grunt.registerTask('default', ['uglify']);

  grunt.registerTask('build', [
    'clean',
    'uglify:build',
    'imagemin',
    'cssmin'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'watch'
  ]);

};