module.exports = (grunt) ->

  stylusStyles = [
    'bower_components/este-library/**/*.styl'
    'client/app/css/**/*.styl'
  ]

  coffeeScripts = [
    'bower_components/este-library/**/*.coffee'
    '!bower_components/este-library/Gruntfile.coffee'
    '!bower_components/este-library/node_modules/**/*.coffee'
    'client/app/js/**/*.coffee'
    'server/**/*.coffee'
  ]

  soyTemplates = [
    'bower_components/este-library/**/*.soy'
    'client/app/js/**/*.soy'
  ]

  clientDirs = [
    'bower_components/closure-library'
    'bower_components/closure-templates'
    'bower_components/este-library'
    'client/app/js'
  ]

  clientDepsPath = 'client/deps.js'
  clientDepsPrefix = '../../../../'

  jsWatchTasks = [
    'esteDeps:all'
    'esteUnitTests:app'
  ]
  if grunt.option 'stage'
    jsWatchTasks.push 'esteBuilder:app'

  grunt.loadNpmTasks 'grunt-bg-shell'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-env'
  grunt.loadNpmTasks 'grunt-este'
  grunt.loadNpmTasks 'grunt-release'

  grunt.initConfig
    clean:
      app:
        options:
          force: true
        src: [
          'bower_components/este-library/**/*.css'
          'bower_components/este-library/**/*.js'
          '!bower_components/este-library/node_modules/**/*.js'
          'client/**/css/**/*.css'
          'client/**/js/**/*.js'
          'server/**/*.js'
        ]

    stylus:
      options:
        'include css': true
        'compress': false
      app:
        files: [
          expand: true
          src: stylusStyles
          ext: '.css'
        ]

    cssmin:
      app:
        files:
          'client/app/build/app.css': 'client/app/css/app.css'

    coffee:
      options:
        bare: true
      app:
        files: [
          expand: true
          src: coffeeScripts
          ext: '.js'
        ]

    coffee2closure:
      app:
        files: [
          expand: true
          src: coffeeScripts
          ext: '.js'
        ]

    esteTemplates:
      options:
        soyToJsJarPath: 'bower_components/closure-templates/SoyToJsSrcCompiler.jar'
      app:
        src: soyTemplates

    esteDeps:
      all:
        options:
          depsWriterPath: 'bower_components/closure-library/closure/bin/build/depswriter.py'
          outputFile: clientDepsPath
          prefix: clientDepsPrefix
          root: clientDirs

    esteBuilder:
      options:
        closureBuilderPath: 'bower_components/closure-library/closure/bin/build/closurebuilder.py'
        compilerPath: 'bower_components/closure-compiler/compiler.jar'
        root: clientDirs
        depsPath: clientDepsPath
        compilerFlags: if grunt.option('stage') == 'debug' then [
          '--output_wrapper="(function(){%output%})();"'
          '--compilation_level="ADVANCED_OPTIMIZATIONS"'
          '--warning_level="VERBOSE"'
          '--define=goog.DEBUG=true'
          '--debug=true'
          '--formatting="PRETTY_PRINT"'
        ]
        else [
          '--output_wrapper="(function(){%output%})();"'
          '--compilation_level="ADVANCED_OPTIMIZATIONS"'
          '--warning_level="VERBOSE"'
          '--define=goog.DEBUG=false'
        ]

      app:
        options:
          namespace: 'app.start'
          outputFilePath: 'client/app/build/app.js'

      # todomvc:
      #   options:
      #     namespace: 'este.demos.app.todomvc.start'
      #     outputFilePath: 'client/app/build/app_todomvc.js'

      # simple:
      #   options:
      #     namespace: 'este.demos.app.simple.start'
      #     outputFilePath: 'client/app/build/app_simple.js'

      # layout:
      #   options:
      #     namespace: 'este.demos.app.layout.start'
      #     outputFilePath: 'client/app/build/app_layout.js'

      # appLocalized:
      #   options:
      #     namespace: 'app.start'
      #     outputFilePath: 'client/app/build/app.js'
      #     messagesPath: 'messages/app'
      #     locales: ['cs', 'de']

      # # Check all source files. Not 100% reliable yet, it can show invalid
      # # warnings.
      # all:
      #   options:
      #     namespace: '*'
      #     outputFilePath: 'client/app/build/app.js'

    esteUnitTests:
      options:
        basePath: 'bower_components/closure-library/closure/goog/base.js'
      app:
        options:
          depsPath: clientDepsPath
          prefix: clientDepsPrefix
        src: [
          'bower_components/este-library/**/*_test.js'
          '!bower_components/este-library/node_modules/**/*.js'
          'client/**/*_test.js'
        ]

    esteExtractMessages:
      app:
        options:
          root: [
            'bower_components/este-library'
            'client/app/js'
          ]
          messagesPath: 'messages/app'
          languages: ['cs', 'de']

    coffeelint:
      options:
        no_backticks:
          level: 'ignore'
        max_line_length:
          level: 'ignore'
      all:
        files: [
          expand: true
          src: coffeeScripts
        ]

    release:
      options:
        bump: true
        add: true
        commit: true
        tag: true
        push: true
        pushTags: true
        npm: true

    env:
      development:
        NODE_ENV: 'development'
      stage:
        NODE_ENV: 'stage'
      production:
        NODE_ENV: 'production'

    bgShell:
      _defaults:
        bg: true
      app:
        cmd: 'node server/app'

    # remember, sudo ulimit -n 10480, see https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-file
    watch:
      options:
        # nospawn option is must for livereload, also speeds up the reaction
        # time of the watch (usually 500ms faster for most).
        nospawn: true
        # https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        livereload: true

      stylus:
        files: stylusStyles
        tasks: if grunt.option('stage') then [
          'stylus:app'
          'cssmin:app'
        ]
        else [
          'stylus:app'
        ]

      coffee:
        files: coffeeScripts
        tasks: [
          'coffee:app'
          'coffee2closure:app'
        ].concat jsWatchTasks

      soy:
        files: soyTemplates
        tasks: [
          'esteTemplates:app'
        ].concat jsWatchTasks

  # ensure only changed files are compiled
  grunt.event.on 'watch', (action, filepath) ->
    fileExtension = filepath.split('.')[1]
    switch fileExtension
      when 'styl'
        grunt.config ['stylus', 'app', 'files'], [
          expand: true
          src: filepath
          ext: '.css'
        ]
      when 'coffee'
        coffeeArgs = [
          expand: true
          src: filepath
          ext: '.js'
        ]
        grunt.config ['coffee', 'app', 'files'], coffeeArgs
        grunt.config ['coffee2closure', 'app', 'files'], coffeeArgs
        grunt.config ['esteUnitTests', 'app', 'src'], filepath
      when 'soy'
        grunt.config ['esteTemplates', 'app'], filepath
        grunt.config ['esteUnitTests', 'app', 'src'], filepath

  grunt.registerTask 'build', 'Build app.', (app) ->
    tasks = [
      "clean:#{app}"
      "stylus:#{app}"
      "coffee:#{app}"
      "coffee2closure:#{app}"
      "coffeelint"
      "esteTemplates:#{app}"
      "esteDeps"
      "esteUnitTests:#{app}"
    ]
    if grunt.option 'stage'
      tasks.push "cssmin:#{app}"
      tasks.push "esteBuilder:#{app}"
    grunt.task.run tasks

  grunt.registerTask 'run', 'Build app and run watchers.', (app) ->
    tasks = [
      "build:#{app}"
      if grunt.option 'stage' then 'env:stage' else 'env:development'
      "bgShell:#{app}"
      "watch"
    ]
    grunt.task.run tasks

  grunt.registerTask 'default', 'run:app'
  grunt.registerTask 'test', 'build:app'