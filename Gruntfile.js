'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Watch Config
        watch: {
            files: ['views/**/*'],
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'assets/scripts/**/*.js',
                ],
            },
            css: {
                files: [
                    'assets/styles/**/*.css',
                ],
            },
            sass: {
                files: ['assets/styles/**/*.scss'],
                tasks: ['sass:dev']
            },
            images: {
                files: [
                    'assets/images/**/*.{png,jpg,jpeg,webp}'
                ],
            },
            express: {
                files:  [ 'app.js', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            },
        },

        // Clean Config
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'app/*',
                        '!app/.git*'
                    ]
                }]
            },
            server: ['.tmp'],
        },

        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/scripts/**/*.js',
                '!assets/scripts/vendor/*',
                'test/spec/**/*.js'
            ]
        },

        // Sass Config
        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineComments: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/styles/sass',
                    dest: 'assets/styles',
                    src: ['screen.scss'],
                    ext: '.css'
                }]
            }
        },

        // Express Config
        express: {
            options: {
              // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },

        // Open Config
        open: {
            site: {
                path: 'http://localhost:3000',
                app: 'Google Chrome'
            },
            editor: {
                path: './',
                app: 'TextMate'
            },
        },

        // Rev Config
        rev: {
            dist: {
                files: {
                    src: [
                        'app/assets/scripts/**/*.js',
                        'app/assets/styles/**/*.css',
                        'app/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
                        'app/assets/styles/fonts/**/*.*'
                    ]
                }
            }
        },

        // Usemin Config
        useminPrepare: {
            options: {
                dest: 'app/assets'
            },
            html: ['assets/{,*/}*.html', 'views/**/*.ejs']
        },
        usemin: {
            options: {
                dirs: ['app/assets'],
                basedir: 'app/assets',
            },
            html: ['app/assets/{,*/}*.html', 'app/views/**/*.ejs'],
            css: ['app/assets/styles/{,*/}*.css']
        },

        // Imagemin Config
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'app/assets/images'
                }]
            }
        },

        // SVGmin Config
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '{,*/}*.svg',
                    dest: 'app/assets/images'
                }]
            }
        },

        // CSSmin config
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         'app/assets/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             'assets/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },

        // HTML Config
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: 'assets',
                    src: '*.html',
                    dest: 'app/assets'
                }]
            }
        },

        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'assets',
                    dest: 'app/assets',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'views',
                    dest: 'app/views/',
                    src: '**/*.ejs'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: 'assets/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
        },

        // Concurrent Config
        concurrent: {
            dist: [
                'copy:styles',
                'svgmin',
                'htmlmin'
            ]
        },
    });





    // Register Tasks
    // Workon
    grunt.registerTask('init', 'Start working on this project.', [
        'jshint',
        'sass:dev',
        'express:dev',
        'open:site',
        'open:editor',
        'watch'
    ]);

		
    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'express:dev',
        'watch'
    ]);
    

    // Build
    grunt.registerTask('build', 'Build production ready assets and views.', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);

};
