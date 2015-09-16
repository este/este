import AppIOS from './App.ios';

export default class App extends AppIOS {

  componentWillMount() {
    console.log('StatusBar is not yet supported in Android');
  }

  componentDidUpdate() {
    console.log('StatusBar is not yet supported in Android');
  }

}
