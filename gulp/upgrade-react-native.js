/* eslint-disable no-console */
import gulp from 'gulp';

gulp.task('upgrade-react-native', () => {
  console.log(`
    Steps to upgrade React Native in Este

    Fresh React Native
      - run 'react-native init Este' somewhere (you should use YourAppName)
      - copy android and ios directories to Este app directory
      - run 'react-native link'
      - follow instruction from github.com/facebook/react-native-fbsdk

    Already existing App
      - run 'react-native upgrade'

    Yeah, it's that easy.
  `);
});
