# Este Native

> The most complete React Native dev stack with the immutable functional app state and stores that acts as reducers.

### At a glance

- ES6 syntax and beyond
- Intl support and other polyfills made easy
- PureRender everywhere
- Flux
- Store reducers
- Immutable app state
- Powerful inspired by React Router routing library

> Webpack and hot reload is currently WIP due to problems with latest React native releases. For the time being, we've decided to
drop it from the current version and consider adding back in the nearest future

<img src="https://cloud.githubusercontent.com/assets/2464966/8488163/f5a99cc4-2110-11e5-8576-a779831c5beb.png" width="400" />

### How to install

```bash
$ npm install
```

### Contributing

This project heavily uses ESLint (refer to .eslint for settings defined), please make sure all tests pass before pushing updated code. Try to be as explicit and idiomatic as possible. Comment methods were possible for further development sake.

### Common problems

> Unexpected use of reserved word "import"

It's likely you've upgraded from Webpack and new packager does not transform all your files with new transformations because they are in cache.
Reset the cache using the tips in below issue (hint: for now, you need to add a flag to packager directly) and rerun:
https://github.com/facebook/react-native/issues/1480#issuecomment-121649714

> Unable to resolve module Dimensions<any other native module>...

This is due to latest change in how React exposes these modules. Till React 0.9, you can ignore it, it will run without any problems. 
