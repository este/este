module.exports = (grunt) ->

  stylusStyles = [
    'bower_components/este-library/**/*.styl'
    'client/app/css/**/*.styl'
  ]

  coffeeScripts = [
    'bower_components/este-library/**/*.coffee'
    '!bower_components/este-library/Gruntfile.coffee'
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

  clientJavaScripts = [
    'bower_components/este-library/**/*.js'
    'client/app/js/**/*.js'
  ]

  clientDepsPath = 'client/deps.js'
  clientDepsPrefix = '../../../../'

  grunt.initConfig
    clean:
      app:
        options:
          force: true
        src: [
          'bower_components/este-library/**/*.js'
          '!bower_components/este-library/node_modules/**/*.js'
          'bower_components/este-library/**/*.css'
          'client/**/js/**/*.js'
          'client/**/css/**/*.css'
          'server/**/*.js'
        ]

    # same params as grunt-contrib-stylus
    esteStylus:
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

    # same params as grunt-contrib-coffee
    esteCoffee:
      options:
        bare: true
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
        # needs Java 1.7+, see http://goo.gl/iS3o6
        fastCompilation: false
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

      appLocalized:
        options:
          namespace: 'app.start'
          outputFilePath: 'client/app/build/app.js'
          messagesPath: 'messages/app'
          locales: ['cs', 'de']

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

    esteWatch:
      app:
        styl:
          files: stylusStyles
          tasks: if grunt.option('stage') then [
            'esteStylus:app'
            'cssmin:app'
          ]
          else [
            'esteStylus:app'
          ]

        js:
          files: clientJavaScripts
          tasks: if grunt.option('stage') then [
            'esteDeps:all'
            'esteUnitTests:app'
            'esteBuilder:app'
          ]
          else [
            'esteDeps:all'
            'esteUnitTests:app'
          ]

        coffee:
          files: coffeeScripts
          tasks: 'esteCoffee:app'

        soy:
          files: soyTemplates
          tasks: 'esteTemplates:app'

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
        npm: false

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

  grunt.registerTask 'build', 'Build app.', (app) ->
    tasks = [
      "clean:#{app}"
      "coffeelint"
      "esteStylus:#{app}"
      "esteCoffee:#{app}"
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
      "esteWatch:#{app}"
    ]
    grunt.task.run tasks

  grunt.registerTask 'default', 'run:app'
  grunt.registerTask 'test', 'build:app'