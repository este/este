gulp = require 'gulp'

# Core.
bg = require 'gulp-bg'
bump = require 'gulp-bump'
chai = require 'chai'
clean = require 'gulp-clean'
closureCompiler = require 'gulp-closure-compiler'
closureDeps = require 'gulp-closure-deps'
coffee = require 'gulp-coffee'
coffee2closure = require 'gulp-coffee2closure'
concat = require 'gulp-concat'
cond = require 'gulp-cond'
diContainer = require 'gulp-closure-dicontainer'
esteWatch = require 'este-watch'
eventStream = require 'event-stream'
exec = require('child_process').exec
filter = require 'gulp-filter'
fs = require 'fs'
git = require 'gulp-git'
gutil = require 'gulp-util'
jsdom = require('jsdom').jsdom
livereload = require 'gulp-livereload'
minifyCss = require 'gulp-minify-css'
mocha = require 'gulp-mocha'
path = require 'path'
plumber = require 'gulp-plumber'
react = require 'gulp-react'
rename = require 'gulp-rename'
requireUncache = require 'require-uncache'
runSequence = require 'run-sequence'
sinon = require 'sinon'
size = require 'gulp-size'
stylus = require 'gulp-stylus'
yargs = require 'yargs'

args = yargs
  .alias 's', 'stage'
  .alias 'p', 'patch'
  .alias 'm', 'minor'
  .argv

paths =
  stylus: [
    'client/app/css/app.styl'
  ]
  coffee: [
    'bower_components/este-library/este/**/*.coffee'
    'client/**/*.coffee'
    'server/**/*.coffee'
  ]
  react: [
    'client/**/*.jsx'
    'server/**/*.jsx'
  ]
  depsPrefix: '../../../..'
  nodejs: 'bower_components/closure-library/closure/goog/bootstrap/nodejs'
  unitTests: [
    'bower_components/este-library/este/**/*_test.js'
    'client/**/*_test.js'
  ]
  compile: [
    'bower_components/closure-library/**/*.js'
    'bower_components/este-library/este/**/*.js'
    'client/**/*.js'
    'server/**/*.js'
    'tmp/**/*.js'
  ]
  packages: './*.json'

watchedDirs = [
  'bower_components/este-library/este'
  'client/app/css'
  'client/app/js'
  'server/app/js'
]

diContainers = [
  name: 'app.DiContainer'
  resolve: ['App']
,
  name: 'server.DiContainer'
  resolve: ['server.App']
]

globals = Object.keys global
livereloadServer = null
changedFilePath = null

# Core.

gulp.task 'clean', ->
  extPaths = []
    .concat paths.stylus, paths.coffee, paths.react
    .map (extPath) -> extPath.replace path.extname(extPath), '.js'
  # Remove only compiled files without its original file.
  isOrphan = (file) ->
    for ext in ['.styl', '.coffee', '.jsx']
      return false if fs.existsSync file.path.replace '.js', ext
    true
  gulp.src extPaths, read: false
    .pipe filter isOrphan
    .pipe clean()

gulp.task 'stylus', ->
  streams = paths.stylus.map (stylusPath) ->
    gulp.src stylusPath, base: '.'
      .pipe stylus set: ['include css']
      .on 'error', (err) -> gutil.log err.message
      .pipe gulp.dest '.'
      .pipe rename (path) ->
        path.dirname = path.dirname.replace '/css', '/build'
        return
      .pipe cond args.stage, minifyCss()
      .pipe gulp.dest '.'
  eventStream.merge streams...
  # TODO(steida): Ensure watch isn't stopped on error. Waiting for Gulp 4
  # github.com/gulpjs/gulp/issues/258.
  return

gulp.task 'coffee', ->
  gulp.src changedFilePath ? paths.coffee, base: '.'
    .pipe plumber()
    .pipe coffee bare: true
    .on 'error', (err) -> gutil.log err.message
    .pipe coffee2closure()
    .pipe gulp.dest '.'

gulp.task 'react', ->
  gulp.src changedFilePath ? paths.react, base: '.'
    .pipe react()
    .pipe gulp.dest '.'

gulp.task 'deps', ->
  gulp.src paths.compile
    .pipe closureDeps
      fileName: 'deps0.js'
      prefix: paths.depsPrefix
    .pipe gulp.dest 'tmp'

gulp.task 'unitTests', ->
  # Clean global variables created during test. For instance: goog and este.
  Object.keys(global).forEach (key) ->
    return if globals.indexOf(key) > -1
    delete global[key]

  # Global aliases for tests.
  global.assert = chai.assert;
  global.sinon = sinon

  # Mock browser, add React.
  doc = jsdom()
  global.window = doc.parentWindow
  global.document = doc.parentWindow.document
  global.navigator = doc.parentWindow.navigator
  global.React = require 'react'

  # Server-side Google Closure, fresh for each test run.
  requireUncache path.resolve paths.nodejs
  requireUncache path.resolve 'tmp/deps0.js'
  require './' + paths.nodejs
  require './' + 'tmp/deps0.js'

  # For watch mode, run foo_test.js when foo.js is changed.
  if changedFilePath && !/_test\.js$/.test changedFilePath
    changedFilePath = changedFilePath.replace '.js', '_test.js'

  autoRequire = (file) ->
    jsPath = file.path.replace '_test.js', '.js'
    return false if not fs.existsSync jsPath
    relativePath = path.join paths.depsPrefix, jsPath.replace __dirname, ''
    namespaces = goog.dependencies_.pathToNames[relativePath];
    namespace = Object.keys(namespaces)[0]
    goog.require namespace if namespace
    true

  gulp.src changedFilePath ? paths.unitTests
    .pipe filter autoRequire
    .pipe mocha
      ui: 'tdd'
      reporter: 'dot'

gulp.task 'diContainer', ->
  streams = for container, i in diContainers
    gulp.src 'tmp/deps0.js'
      .pipe diContainer
        baseJsDir: 'bower_components/closure-library/closure/goog'
        fileName: container.name.toLowerCase().replace('.', '') + '.js'
        name: container.name
        resolve: container.resolve
      .pipe gulp.dest 'tmp'
      # Create deps for just created DI container.
      .pipe closureDeps prefix: paths.depsPrefix, fileName: "deps#{i+1}.js"
      .pipe gulp.dest 'tmp'
  eventStream.merge streams...

gulp.task 'concatDeps', ->
  gulp.src 'tmp/deps?.js'
    .pipe concat 'deps.js'
    .pipe gulp.dest 'tmp'

gulp.task 'concatScripts', ->
  src = if args.stage then [
    'bower_components/react/react.min.js'
    'client/app/build/app.js'
  ]
  else [
    'bower_components/react/react.js'
  ]
  gulp.src src
    .pipe concat 'app.js'
    .pipe gulp.dest 'client/app/build'

gulp.task 'livereload-notify', ->
  return if !changedFilePath
  livereloadServer.changed changedFilePath

compileOptions = ->
  options =
    fileName: 'app.js'
    compilerPath: 'bower_components/closure-compiler/compiler.jar'
    compilerFlags:
      closure_entry_point: 'app.main'
      compilation_level: 'ADVANCED_OPTIMIZATIONS'
      define: [
        "goog.DEBUG=#{args.stage == 'debug'}"
      ]
      externs: [
        'bower_components/este-library/externs/react.js'
      ]
      extra_annotation_name: 'jsx'
      only_closure_dependencies: true
      output_wrapper: '(function(){%output%})();'
      warning_level: 'VERBOSE'

  if args.stage == 'debug'
    # Debug and formatting makes compiled code readable.
    options.compilerFlags.debug = true
    options.compilerFlags.formatting = 'PRETTY_PRINT'

  options

compile = (dest, compileOptions) ->
  gulp.src paths.compile
    .pipe closureCompiler compileOptions
    .pipe size showFiles: true, gzip: true
    .pipe gulp.dest dest

getExterns = (dir) ->
  fs.readdirSync 'bower_components/closure-compiler-externs'
    .filter (file) -> /\.js$/.test file
    .filter (file) ->
      # Remove Stdio because it does not compile.
      # TODO(steida): Fork and fix these externs.
      file not in ['stdio.js']
    .map (file) -> dir + file

gulp.task 'compileClientApp', ->
  options = compileOptions()
  options.compilerFlags.closure_entry_point = 'app.main'
  compile 'client/app/build', options

gulp.task 'compileServerApp', ->
  options = compileOptions()
  options.compilerFlags.closure_entry_point = 'server.main'
  # Server side code is compiled for optimization and static analysis aspects.
  # Debug and formatting flags ensure stack trace readability.
  options.compilerFlags.debug = true
  options.compilerFlags.formatting = 'PRETTY_PRINT'
  nodeJsExterns = getExterns 'bower_components/closure-compiler-externs/'
  options.compilerFlags.externs.push nodeJsExterns...
  compile 'server/app/build', options

gulp.task 'js', (callback) ->
  sequence = []
  sequence.push 'deps' if closureDeps.changed changedFilePath
  sequence.push 'unitTests', 'diContainer', 'concatDeps'
  sequence.push [
    'compileClientApp'
    'compileServerApp'
  ] if args.stage
  sequence.push 'concatScripts'
  sequence.push 'livereload-notify' if changedFilePath && !args.stage
  sequence.push callback
  runSequence sequence...

gulp.task 'build', (callback) ->
  runSequence [
    'clean'
    'stylus'
    'coffee'
    'react'
    'js'
    callback
  ]...

gulp.task 'env', ->
  process.env['NODE_ENV'] = if args.stage
    'stage'
  else
    'development'

gulp.task 'server', bg 'node', ['server/app']

gulp.task 'livereload-server', ->
  livereloadServer = livereload()
  return

gulp.task 'watch', ->
  watch = esteWatch watchedDirs, (e) ->
    changedFilePath = path.resolve e.filepath
    switch e.extension
      when 'coffee' then gulp.start 'coffee'
      when 'css' then gulp.start 'livereload-notify'
      when 'js' then gulp.start 'js'
      when 'jsx' then gulp.start 'react'
      when 'styl' then gulp.start 'stylus'
      else changedFilePath = null
  watch.start()

gulp.task 'run', (callback) ->
  runSequence 'env', 'livereload-server', 'watch', 'server', callback

gulp.task 'default', (callback) ->
  runSequence 'build', 'run', callback

gulp.task 'bump', (done) ->
  gulp.src paths.packages
    .pipe bump type: args.major && 'major' || args.minor && 'minor' || 'patch'
    .pipe gulp.dest './'
    .on 'end', ->
      version = require('./package').version
      message = "Bump #{version}"
      gulp.src paths.packages
        .pipe git.add()
        .pipe git.commit message
        .on 'end', ->
          git.push 'origin', 'master', {}, ->
            git.tag version, message, {}, ->
              git.push 'origin', 'master', args: ' --tags', done
  return

# More.
# Per project tasks here.