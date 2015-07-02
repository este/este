# Este Native

> The most complete React Native dev stack with the immutable functional app state and stores that acts as reducers.

### At a glance

- Webpack out of the box
- ES6 syntax and beyond
- Bluebird, window.fetch and other pollyfils
- PureRender everywhere
- Flux
- Store reducers
- Immutable app state
- Powerful inspired by React Router routing library

<img src="https://cloud.githubusercontent.com/assets/2464966/8488163/f5a99cc4-2110-11e5-8576-a779831c5beb.png" width="400" />

### How to install

```bash
$ npm install
$ npm start
```

### How to run

The application uses webpack instead of react-native-packager so it can use all the ES6/ES7 goodies until they are officially supported by React Native.

Because React Native Packager starts automatically when you run XCode project and there's no way to disable that behaviour, you will need to close packager manually and start the custom one provided. The custom packager (webpack) will run react native packager behind the scenes automatically.

As React Native Packager checks if it's already running, there's no need to repeat the guide below once webpack has started as native packager won't start again.

- Open XCode, start project
- Close the terminal window that appeared (it will say React Packager)
- Go to folder where the app lives (keep the simulator open all the time, it may show red screen of death)
- `npm start`
- Refresh after you see a React Packager header (same you've closed in step number 4). If you will see an error saying `cannot find .../_entry` it's likely you have refreshed your Simulator before React packager has started. Go to step #7.
- Keep coding. Bundle reloads and rebuilds automatically with Webpack and ES6.

### Contributing

This project heavily uses ESLint (refer to .eslint for settings defined), please make sure all tests pass before pushing updated code. Try to be as explicit and idomatic as possible. Comment methods were possible for further development sake.

In order to contribute, please fork this repository and create a branch with appropriate prefix (either `feature` or `fix`). For other questions, refer to Gitflow guide directly.
