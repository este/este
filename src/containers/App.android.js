// Append extension so packager loads the base version
import BaseApp from './App.js';

export default class AndroidApp extends BaseApp {

  componentWillMount() {
    console.log('StatusBar is not yet supported in Android');
  }

  componentDidUpdate() {
    console.log('StatusBar is not yet supported in Android');
  }

}
