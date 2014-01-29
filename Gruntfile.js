module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'site'
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:3000/'
      }
    },
    clean: {
      css: [ 'site/assets/css/*.css' ],
      js: [ 'site/assets/js/*.js' ],
      images: [ 'site/assets/images/**' ],
      site: [ 'site' ],
      tmp: [ 'tmp/*' ]
    },
    copy: {
      images: {
        expand: true,
        cwd: 'assets/images/',
        src: '**',
        dest: 'site/assets/images/'
      },
      images: {
        expand: true,
        src: 'images/**',
        dest: 'site/'
      },
      static: {
        expand: true,
        cwd: 'static/',
        src: '**',
        dest: 'site/',
        dot: true
      }
    },
    less: {
      options: {
        compress: true,
        stripBanners: true,
        banner: '/*! Generated on <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
      },
      styles: {
        files: {
          'site/assets/css/application.css': [ 'assets/css/index.less' ]
        }
      }
    },
    uglify: {
      javascripts: {
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: [ '**/*.js', '!**/*.min.js' ],
          dest: 'tmp/js/'
        }]
      }
    },
    concat: {
      options: {
        banner: '/*! Generated on <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
      },
      js: {
        files: {
          'site/assets/js/application.js': [ 'assets/js/**/jquery-*.min.js', 'assets/js/**/*.min.js', 'tmp/js/**/*.js' ]
        }
      }
    },
    md5: {
      options: {
        afterEach: function(fileChanged) {
          grunt.file.delete(fileChanged.oldPath);
        },
        after: function(filesChanged) {
          var compiled_assets = grunt.config('assemble.options.compiled_assets') || {};
          for (var i = 0; i < filesChanged.length; i++) {
            compiled_assets[filesChanged[i].oldPath.replace(/^site/, '')] = filesChanged[i].newPath.replace(/^site/, '');
          }
          grunt.config('assemble.options.compiled_assets', compiled_assets);
        }
      },
      css: {
        files: {
          'site/assets/css/': [ 'site/assets/css/*.css' ]
        }
      },
      js: {
        files: {
          'site/assets/js/': [ 'site/assets/js/*.js' ]
        }
      }
    },
    assemble: {
      options: {
        pkg: '<%= pkg %>',
        plugins: [ 'assemble-permalink', './plugins/*.js' ],
        helpers: [ 'handlebars-helper-prettify', 'helpers/*.js' ],
        partials: [ 'partials/*.hbs' ],
        layoutdir: 'layouts',
        layout: 'default.hbs',
        production: false,
        data: [ 'posts/*.yml' ],
        configs: grunt.file.readYAML('configs/configs.yml')
      },
      news: {
        options: {
          layout: 'details.hbs',
          nav: 'news',
          permalink: '/news/{{ basename }}.html',
          export_posts_list_as: 'news'
        },
        files: { 'site/': [ 'posts/news/*.hbs', 'posts/news/**/*.md' ] }
      },
      gps: {
        options: {
          layout: 'details.hbs',
          pages: grunt.file.readYAML('posts/gps.yml'),
          nav: 'gps'
        },
        files: { 'site/': [] }
      },
      solutions: {
        options: {
          layout: 'details.hbs',
          pages: grunt.file.readYAML('posts/solutions.yml'),
          nav: 'solutions'
        },
        files: { 'site/': [] }
      },
      download: {
        options: {
          layout: 'details.hbs',
          pages: grunt.file.readYAML('posts/download.yml'),
          nav: 'download'
        },
        files: { 'site/': [] }
      },
      job: {
        options: {
          layout: 'details.hbs',
          pages: grunt.file.readYAML('posts/job.yml'),
          nav: 'job'
        },
        files: { 'site/': [] }
      },
      static: {
        files: {
          'site/': [ 'pages/*.hbs', 'pages/*.handlebars', '!pages/sitemap.handlebars' ]
        }
      },
      final: {
        files: {
          'site/': [ 'pages/sitemap.handlebars' ]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      /* NOTE: DO NOT WATCH FILES IN WORKING DIRECTORY
       * It may be a bug that tasks watching files in working
       * directory will be executed when new directory creates,
       * though this directory is not in the task's files option.
       */
      css: {
        files: [ 'assets/css/*.less' ],
        tasks: [ 'clean:css', 'less' ]
      },
      js: {
        files: [ 'assets/js/*.js' ],
        tasks: [ 'clean:js', 'uglify', 'concat' ]
      },
      grunt: {
        files: [ 'Gruntfile.js' ]
      },
      reassemble: {
        files: [ 'helpers/*', 'plugins/*', 'config/*', 'layouts/*', 'partials/*', 'pages/*.handlebars' ],
        tasks: [ 'assemble' ]
      },
      index: {
        files: [ 'pages/*.hbs' ],
        tasks: [ 'assemble:static' ]
      },
      news: {
        files: [ 'posts/news/**/*' ],
        tasks: [ 'assemble:news' ]
      },
      download: {
        files: [ 'posts/download.yml' ],
        tasks: [ 'assemble:download' ]
      },
      gps: {
        files: [ 'posts/gps.yml' ],
        tasks: [ 'assemble:gps' ]
      },
      job: {
        files: [ 'posts/job.yml' ],
        tasks: [ 'assemble:job' ]
      },
      solutions: {
        files: [ 'posts/solutions.yml' ],
        tasks: [ 'assemble:solutions' ]
      },
      images: {
        files: [ 'assets/images/**' ],
        tasks: [ 'clean:images', 'copy' ]
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-md5');

  grunt.registerTask('assemble_in_production', '', function() {
    grunt.config('assemble.options.production', true);
    var pkg = grunt.config('assemble.options.pkg');
    if (pkg.use_production_url) {
      pkg.url = pkg.production_url;
      grunt.config('assemble.options.pkg', pkg);
    }
    grunt.log.ok('Entered production mode.');
  });
  grunt.registerTask('common', [ 'clean', 'less', 'uglify', 'concat', 'clean:tmp', 'copy' ]);
  grunt.registerTask('default', [ 'common', 'assemble', 'connect', 'open', 'watch' ]);
  grunt.registerTask('make', [ 'common', 'md5', 'assemble_in_production', 'assemble' ]);
};
