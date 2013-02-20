module.exports = (grunt) ->

  appDirs = [
    'bower_components/closure-library'
    'bower_components/closure-templates'
    'bower_components/este-library'
    'client/app/js'
  ]

  appStylusFiles = [
    'bower_components/este-library/**/*.styl'
    'client/app/css/**/*.styl'
  ]

  appCoffeeFiles = [
    'bower_components/este-library/**/*.coffee'
    'client/app/js/**/*.coffee'
  ]

  appJsFiles = [
    'bower_components/este-library/**/*.js'
    'client/app/js/**/*.js'
  ]

  appTemplates = [
    'bower_components/este-library/**/*.soy'
    'client/app/js/**/*.soy'
  ]

  appCompiledOutputPath =
    'client/app/assets/app.js'

  depsPath =
    'bower_components/deps.js'

  # from closure base.js dir to app root dir
  depsPrefix = '../../../../'

  grunt.initConfig

    # same params as grunt-contrib-stylus
    esteStylus:
      options:
        'include css': true
      app:
        files: [
          expand: true
          src: appStylusFiles
          ext: '.css'
        ]

    # same params as grunt-contrib-coffee
    esteCoffee:
      options:
        bare: true
      app:
        files: [
          expand: true
          src: appCoffeeFiles
          ext: '.js'
        ]

    esteTemplates:
      options:
        soyToJsJarPath: 'bower_components/closure-templates/SoyToJsSrcCompiler.jar'
      app:
        src: appTemplates

    esteDeps:
      all:
        options:
          depsWriterPath: 'bower_components/closure-library/closure/bin/build/depswriter.py'
          # consider rename to outputFile
          outputFile: depsPath
          prefix: depsPrefix
          root: appDirs

    esteBuilder:
      options:
        closureBuilderPath: 'bower_components/closure-library/closure/bin/build/closurebuilder.py'
        compilerPath: 'bower_components/closure-compiler/compiler.jar'
        namespace: 'app.start'
        # needs Java 1.7+
        fastCompilation: false
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
          root: appDirs
          outputFilePath: appCompiledOutputPath
          depsPath: depsPath

      appLocalized:
        options:
          root: appDirs
          outputFilePath: appCompiledOutputPath
          depsPath: depsPath
          messagesPath: 'messages/app'
          locales: ['cs', 'de']

    esteUnitTests:
      options:
        basePath: 'bower_components/closure-library/closure/goog/base.js'
      app:
        options:
          depsPath: depsPath
          prefix: depsPrefix
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

    connect:
      server:
        options:
          port: 8000
          keepalive: true

    esteWatch:
      app:
        styl:
          files: appStylusFiles
          tasks: 'esteStylus:app'

        js:
          files: appJsFiles
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
          files: appCoffeeFiles
          tasks: 'esteCoffee:app'

        soy:
          files: appTemplates
          tasks: 'esteTemplates:app'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-este'

  grunt.registerTask 'run', 'To start development.', (app) ->
    tasks = [
      "esteStylus:#{app}"
      "esteCoffee:#{app}"
      "esteTemplates:#{app}"
      "esteDeps"
      "esteUnitTests:#{app}"
    ]
    if grunt.option 'stage'
      tasks.push "esteBuilder:#{app}"
    unless grunt.option 'ci'
      tasks.push 'esteWatch'

    grunt.task.run tasks

  grunt.registerTask 'default', 'run:app'