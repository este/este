# Este [![Build Status](https://secure.travis-ci.org/steida/este.png?branch=master)](http://travis-ci.org/steida/este) [![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este) [![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)

Robust and comfortable dev stack for [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) (browser + Node.js) web apps.

#### Libraries
  - [Google Closure](https://developers.google.com/closure/library/)
  - [Facebook React](http://facebook.github.io/react/)
  - Polymer
    - [Pointer Events](http://www.polymer-project.org/platform/pointer-events.html)
    - [observe-js](https://github.com/Polymer/observe-js)
  - [este-library](https://github.com/steida/este-library)

#### Languages
  - ES6 (via Facebook React [jstransform](https://github.com/facebook/jstransform/tree/master/visitors/__tests__))
  - [CoffeeScript](coffeescript.org) (compatible with [Closure Compiler](https://developers.google.com/closure/compiler/))
  - [Stylus](http://learnboost.github.io/stylus/)
  - CSS Less (in progress)

#### Tools
  - Well tuned [gulpjs.com](gulpjs.com) dev stack.
  - Super fast [file-watcher](https://github.com/steida/este-watch).  
  - [DI Container](https://github.com/steida/gulp-closure-dicontainer) for with automatic registration and resolving based on types.
  - Unit testing with [Mocha](http://visionmedia.github.io/mocha).

#### Features
  - React server-side rendering.
  - Isomorphic routing (in progress).
  - MVC meta framework (in progress).

## Prerequisites
  [Java 1.7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and [Node.js](http://nodejs.org) are required.
  ```shell
  npm install -g gulp
  npm install -g bower
  ```

## Getting Started

### Create Este App

  ```shell
  git clone https://github.com/steida/este.git este-app
  cd este-app
  npm install
  bower install
  ```

### Start Development

  - run ```gulp```
  - point your browser to [localhost:8000](http://localhost:8000)
  - build something beautiful

## Usage

  Start development. Build app and run development stack.

  ```gulp ```

  Production mode. Styles are minified and scripts are compiled.

  ```gulp --production``` or ```gulp -p```

  Only build. Useful for continuous integration.

  ```gulp build``` or ```gulp build --production```

  Run development stack. Useful to skip building phase.

  ```gulp run``` or ```gulp run --production```

  Debug makes compiled scripts readable.

  ```gulp build --production=debug```

### Recommended Editor: [Atom.io](http://atom.io)

Editor [settings](https://github.com/steida/atom-io-settings).

## Stay Tuned

  - [twitter.com/estejs](https://twitter.com/estejs)
  - [medium.com/@steida](https://medium.com/@steida)
  - [groups.google.com/forum/#!forum/estejs](https://groups.google.com/forum/#!forum/estejs)

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.
