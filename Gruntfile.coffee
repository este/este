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

  clientDepsPath =
    'client/deps.js'

  clientDepsPrefix =
    '../../../../'

  grunt.initConfig

    clean:
      app:
        options:
          force: true
        src: [
          'bower_components/este-library/**/*.css'
          'bower_components/este-library/**/*.js'
          '!bower_components/este-library/node_modules/**/*.js'
          'client/**/build/**.*'
          'client/**/css/**/*.css'
          'client/**/js/**/*.js'
          'server/**/*.js'
        ]

    stylus:
      options:
        'include css': true
        'compress': false
      all:
        files: [
          expand: true
          src: stylusStyles
          ext: '.css'
        ]
      app:
        files: [
          expand: true
          src: 'client/app/css/app.styl'
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
      app:
        src: soyTemplates

    esteDeps:
      all:
        options:
          outputFile: clientDepsPath
          prefix: clientDepsPrefix
          root: clientDirs

    esteBuilder:
      options:
        root: clientDirs
        depsPath: clientDepsPath
        # TODO: make common params
        compilerFlags: if grunt.option('stage') == 'debug' then [
          '--output_wrapper="(function(){%output%})();"'
          '--compilation_level="ADVANCED_OPTIMIZATIONS"'
          '--warning_level="VERBOSE"'
          '--debug=true'
          '--formatting="PRETTY_PRINT"'
          '--define=goog.DEBUG=true'
        ]
        else [
          '--output_wrapper="(function(){%output%})();"'
          '--compilation_level="ADVANCED_OPTIMIZATIONS"'
          '--warning_level="VERBOSE"'
          '--define=goog.DEBUG=false'
          # disable support for IE6/7, old Gecko, old Webkit
          '--define=goog.net.XmlHttp.ASSUME_NATIVE_XHR=true'
          '--define=goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS=true'
          '--define=este.json.SUPPORTS_NATIVE_JSON=true'
        ]

      app:
        options:
          namespace: 'app.start'
          outputFilePath: 'client/app/build/app.js'

      # este.App demos compilation examples.
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

      # Use this task to build all languages, /client/build/app_de.js etc.
      # appLocalized:
      #   options:
      #     namespace: 'app.start'
      #     outputFilePath: 'client/app/build/app.js'
      #     messagesPath: 'messages/app'
      #     locales: ['cs', 'de']

    esteUnitTests:
      options:
        depsPath: clientDepsPath
        prefix: clientDepsPrefix
      app:
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

    esteWatch:
      options:
        dirs: [
          'bower_components/closure-library/**/'
          'bower_components/este-library/**/'
          '!bower_components/este-library/node_modules/**/'
          'client/**/{js,css}/**/'
        ]

      coffee: (filepath) ->
        files = [
          expand: true
          src: filepath
          ext: '.js'
        ];
        grunt.config ['coffee', 'app', 'files'], files
        grunt.config ['coffee2closure', 'app', 'files'], files
        ['coffee:app', 'coffee2closure:app']

      soy: (filepath) ->
        grunt.config ['esteTemplates', 'app'], filepath
        ['esteTemplates:app']

      js: (filepath) ->
        grunt.config ['esteUnitTests', 'app', 'src'], filepath
        tasks = ['esteDeps:all', 'esteUnitTests:app']
        if grunt.option 'stage'
          tasks.push 'esteBuilder:app'
        tasks

      styl: (filepath) ->
        grunt.config ['stylus', 'all', 'files'], [
           expand: true
           src: filepath
           ext: '.css'
        ]
        ['stylus:all', 'stylus:app']

      css: (filepath) ->
        if grunt.option('stage')
          return 'cssmin:app'

  grunt.loadNpmTasks 'grunt-bg-shell'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-env'
  grunt.loadNpmTasks 'grunt-este'
  grunt.loadNpmTasks 'grunt-este-watch'
  grunt.loadNpmTasks 'grunt-release'

  grunt.registerTask 'build', 'Build app.', (app = 'app') ->
    tasks = [
      "clean:#{app}"
      "stylus:all"
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

  grunt.registerTask 'run', 'Run stack.', (app = 'app') ->
    grunt.task.run [
      if grunt.option 'stage' then 'env:stage' else 'env:development'
      "bgShell:#{app}"
      "esteWatch"
    ]

  grunt.registerTask 'default', 'Build app and run stack.', (app = 'app') ->
    grunt.task.run [
      "build:#{app}"
      "run:#{app}"
    ]