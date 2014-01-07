module.exports = function (grunt) {

//    require('time-grunt')(grunt); // Displays the elapsed execution time of grunt tasks when done

    var config = {
        /**
         * Project paths configuration
         */

        /* BASE Folders */
        sourcesDir: 'client/sources',
        buildDevDir: 'client/build-dev',
        buildProdDir: 'client/build',

        scriptsDir: 'client/sources/scripts',
        scriptsAppDir: 'client/sources/scripts/app',
        stylesDir: 'client/sources/styles',
        templatesDir: 'client/sources/templates',
        imagesDir: 'client/sources/images',
        fontsDir: 'client/sources/fonts',

        /* KARMA Runner configuration (tests) */
        indexScript: '<%=scriptsAppDir%>/index.js', // used by karma runner
        appScripts: '<%=scriptsAppDir%>/**/*.js', // used by karma runner
        testScripts: 'test/js/**/*.js',

        userScripts: ['<%= appScripts %>', '<%= indexScript %>' , '!<%=scriptsDir%>/vendor/**/*.js'],

        /* Compass configuration + CSSLint */
        stylesCompiledDir: '<%=buildProdDir%>/css',  // used by compass & csslint

        /* Configuration files locations */
        configs: {
            testing: 'test/config.js',
            jshintrc: '.jshintrc',
            csslintrc: '.csslintrc'
        },

        /* REPORTS */
        reportsDir: 'reports',
        reports: {
            coverage: '<%= reportsDir %>/test-coverage/',
            jshint: '<%= reportsDir %>/report-jshint.xml',
            csslint: '<%= reportsDir %>/report-csslint.xml',
            testing: '<%= reportsDir %>/report-test-results.xml'
        },

        /**
         *
         * END: Project paths configuration
         *
         */

        pgk: grunt.file.readJSON('package.json'),

        /**
         * Build environments
         */
        /**
        * The different constant names that will be use to build our html files.
        * @example <!-- @if NODE_ENV == 'DEVELOPMENT' -->
        */
        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod: {
                NODE_ENV : 'PRODUCTION'
            }
        },

        /**
        * Allows us to pass in variables to files that have place holders so we can similar files with different data.
        * This plugin works with the 'env' plugin above.
        * @example <!-- @echo appVersion --> or <!-- @echo filePath -->
        */
        preprocess : {
            // Task to create the index.html file that will be used during development.
            // Passes the app version and creates the /index.html
            dev: {
                src : '<%= sourcesDir %>' + '/templates/index.html',
                dest : '<%= buildDevDir %>' + '/index.html'
            },
            // Task to create the index.html file that will be used in production.
            // Passes the app version and creates the /index.html
            prod: {
                src : '<%= sourcesDir %>' + '/templates/index.html',
                dest : '<%= buildProdDir %>' + '/index.html'
            },
            server: {
                src: ['server/index.js'],
                options: {
                    inline: true,
                    context: {
                        buildPath: '<%=buildProdDir%>'
                    }
                }
            }
        },

        /**
        * Cleans or deletes our production folder before we create a new production build.
        */
        clean: {
            dev: ['<%= buildDevDir %>'],
            prod: ['<%= buildProdDir %>']
        },

        /**
        * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
        */
        copy: {
            dev: {
                files: [
                    // how to copy new images that generated during dev?
                    // Copy images
                    { expand: true, cwd: '<%= imagesDir %>', src: ['**'], dest: '<%= buildDevDir %>/images/' },
                    // Copy fonts
                    { expand: true, cwd: '<%= fontsDir %>', src: ['**'], dest: '<%= buildDevDir %>/fonts/' }
                ]
            },
	        scripts: {
		        files: [
			        { expand: true, cwd: '<%= scriptsDir %>', src: ['**'], dest: '<%= buildDevDir %>/js/' }
		        ]
	        },
            prod: {
                files: [
                    // how to copy new images that generated during dev?
                    // Copy images
                    { expand: true, cwd: '<%= imagesDir %>', src: ['**'], dest: '<%= buildProdDir %>/images/' },
                    // Copy fonts
                    { expand: true, cwd: '<%= fontsDir %>', src: ['**'], dest: '<%= buildProdDir %>/fonts/' }
                ]
            }
        },

        /* Metrics configuration */
        jshint: {
            all: {
                src: '<%= userScripts %>'
            },
            options: {
                force: true,
                jshintrc: '<%= configs.jshintrc %>',
                reporter: require('jshint-jenkins-checkstyle-reporter'),
                reporterOutput: '<%= reports.jshint %>'
            }
        },
        csslint: {
            prod: {
                src: '<%= stylesCompiledDir %>/*.css',
                options: {
                    csslintrc: '<%= configs.csslintrc %>',
                    formatters: [
                        {id: 'lint-xml', dest: '<%= reports.csslint %>'}
                    ]
                }
            },
            dev: {
                src: '<%= stylesCompiledDir %>/*.css',
                options: {
                    csslintrc: '<%= configs.csslintrc %>'
                }
            }
        },

        /* processing & compiling */
        compass: {
            prod: {
                options: {
                    sassDir: '<%= stylesDir %>',
                    imagesDir: '<%=imagesDir%>',
                    fontsDir: '<%=fontsDir%>',
                    cssDir: '<%=buildProdDir%>/css',
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            },
            dev: {
                options: {
                    sassDir: '<%= stylesDir %>',
                    imagesDir: '<%=imagesDir%>',
                    fontsDir: '<%=fontsDir%>',
                    cssDir: '<%=buildDevDir%>/css',
                    environment: 'development',
                    force: true
                }
            }
        },
        /* r.js optimizer configuration: https://github.com/jrburke/r.js/blob/master/build/example.build.js */
        requirejs: {
            dev: {
                options: {
                    mainConfigFile: '<%=scriptsAppDir%>/require_config.js',
                    baseUrl: '<%=scriptsDir%>',
                    name: 'app/index',
                    dir: '<%= buildDevDir %>/js',
                    optimize: 'none',

                    //Finds require() dependencies inside a require() or define call. By default
                    //this value is false, because those resources should be considered dynamic/runtime
                    //calls. However, for some optimization scenarios, it is desirable to
                    //include them in the build.
                    findNestedDependencies: true,
                    //If set to true, any files that were combined into a build bundle will be removed from the output folder.
                    removeCombined: true,
                    // the dir above will be deleted before the build starts again. If you have a big build and are not doing
                    // source transforms with onBuildRead/onBuildWrite, then you can
                    // set keepBuildDir to true to keep the previous dir.
                    keepBuildDir: true,
                    generateSourceMaps: false,
                    preserveLicenseComments: false
                }
            },
            prod: {
                options: {
                    mainConfigFile: '<%=scriptsAppDir%>/require_config.js',
                    baseUrl: '<%=scriptsDir%>',
                    name: 'app/index',
                    out: '<%=buildProdDir%>/js/index.min.js',
                    optimize: 'uglify2',
                    include: ['vendor/require'],

                    //Finds require() dependencies inside a require() or define call. By default
                    //this value is false, because those resources should be considered dynamic/runtime
                    //calls. However, for some optimization scenarios, it is desirable to
                    //include them in the build.
                    findNestedDependencies: true,
                    //If set to true, any files that were combined into a build bundle will be removed from the output folder.
                    removeCombined: true,
                    // the dir above will be deleted before the build starts again. If you have a big build and are not doing
                    // source transforms with onBuildRead/onBuildWrite, then you can
                    // set keepBuildDir to true to keep the previous dir.
                    keepBuildDir: true,
                    generateSourceMaps: false,
                    preserveLicenseComments: false
                }
            }
        },

/* Server , tests automation */
karma: {
    options: {
        reportSlowerThan: 0,
        runnerPort: 9999,
        port: 9988,

        basePath: './',
        frameworks: ['mocha', 'requirejs:prod', 'chai'],
        files: [
            '<%= configs.testing %>',
            {pattern: '<%= indexScript %>', included: false},
            {pattern: '<%= appScripts %>', included: false},
            {pattern: '<%= testScripts %>', included: false}

        ],
        exclude: ['<%= indexScript %>'],
        junitReporter: {
            outputFile: '<%= reports.testing %>'
        },
        preprocessors: {
            /*source files, that you wanna generate coverage for do not include tests or libraries (these files will be instrumented by Istanbul)*/
            '<%= appScripts %>': ['coverage']
        },
        coverageReporter: {
            type: ['html'],
            dir: '<%= reports.coverage %>'
        }
    },
    unit: {
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        logLevel: 'WARN',
        background: true
    },
    prod: {
        reporters: ['progress', 'coverage', 'junit'],
        browsers: ['PhantomJS'],
        logLevel: 'ERROR',
        singleRun: true,
        captureTimeout: 30000,
        force: true
    }
},

        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    bases: '<%= testBase %>',
                    livereload: true
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.all.options.port %>'
            },
            'serverDebug': {
         				path: 'http://127.0.0.1:9999/debug?port=5858'
         			}
        },

        /* Watcher */
        watch: {
            scripts: {
                files: '<%= userScripts %>',
                tasks: ['copy:scripts']
            },

            styles: {
                files: '<%=stylesDir%>/**/*.scss',
                tasks: ['compass:dev']
            },

            indexhtml: {
                files: ['<%=templatesDir%>/index.html'],
                tasks: ['preprocess:dev']
            },

            options: {
                debounceDelay: 200,
                atBegin: true
                //livereload: true
            }

            // run unit tests with karma (server needs to be already running)
            //karma: {
            //    files: ['<%= appScripts %>', '<%= testScripts %>'],
            //    tasks: ['karma:unit:run']
            //}
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['watch', 'nodemon']
            },
            debug: {
                tasks: ['watch', 'nodemon', 'node-inspector', 'open:serverDebug']
            }
        },

        // SERVER side tasks
        nodemon: {
            dev: {
                options: {
                    watchedFolders: ['server'],
                    nodeArgs: ['--debug']
                }
            }
        },
        'node-inspector': {
            dev: {
                options: {
                    'web-port': 9999,
                    'web-host': '127.0.0.1'
                }
            }
        }
    };

    grunt.registerTask('work', [
        // --- client ---
        'env:dev',
        'clean:dev',
        'preprocess:dev',
        'copy:dev',
        'concurrent:dev'
//        'watch'
        // tests
    ]);

    grunt.registerTask('build', [
        // --- client ---
        'env:prod',
        'clean:prod',
        'preprocess:prod',
        'copy:prod'
    ]);

    grunt.registerTask('server', 'Server side nodejs developemnt tasks', [
        'concurrent:dev'
    ]);

    grunt.registerTask('default', ['work']);

    grunt.initConfig(config);

    /**
     * Grunt Helpers
     * ========================================================================== */

    /**
     * Special grunt task to turn on/off force property
     * --force allows to continue tasks even if they fails
     *
     * Usage: insert required force triggering task before/after certain tasks.
     * e.g. ['force:on', 'csslint', 'force:off', 'jshint']
     *
     * @link: http://stackoverflow.com/questions/16612495/continue-certain-tasks-in-grunt-even-if-one-fails/16972894
     */
    var previous_force_state = grunt.option("force");
    grunt.registerTask("force", function (set) {
        if (set === "on") {
            grunt.option("force", true);
        }
        else if (set === "off") {
            grunt.option("force", false);
        }
        else if (set === "restore") {
            grunt.option("force", previous_force_state);
        }
    });

    /**
     * Load all grunt-* tasks from the package.json
     */
    require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

};