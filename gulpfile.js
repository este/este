var bg = require('gulp-bg')
var gulp = require('gulp')
var makeWebpackConfig = require('./webpack/makeconfig')
var webpackBuild = require('./webpack/build')
var webpackDevServer = require('./webpack/devserver')
var yargs = require('yargs')
var jest = require('jest-cli')
var harmonize = require('harmonize')
harmonize()

var args = yargs
  .alias('p', 'production')
  .argv

gulp.task('env', function() {
  process.env.NODE_ENV = args.production ? 'production' : 'development'
})

gulp.task('build-webpack', (args.production ? webpackBuild : webpackDevServer)
  (makeWebpackConfig(!args.production)))

gulp.task('build', ['build-webpack'])

// TODO: Add es6lint and more.
gulp.task('test', webpackBuild(makeWebpackConfig(false)))

gulp.task('jest', function() {
  var rootDir = './src',
    successHandler = function (success) {
      process.on('exit', function(){
        process.exit(success ? 0 : 1)
      })
    }

  jest.runCLI({config: {
    'rootDir': rootDir,
    'scriptPreprocessor': '../node_modules/babel-jest',
    'testFileExtensions': ['es6', 'js'],
    'moduleFileExtensions': ['js', 'json', 'es6']
  }}, rootDir, successHandler)
})

gulp.task('server', ['env', 'build'], bg('node', 'src/server'))

gulp.task('default', ['server'])
