import gulp from 'gulp';
import webpackBuild from '../webpack/build';

gulp.task('build-webpack', ['env'], done => webpackBuild(done));
