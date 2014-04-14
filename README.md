# Este [![Build Status](https://secure.travis-ci.org/steida/este.png?branch=master)](http://travis-ci.org/steida/este) [![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este) [![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)

Robust and comfortable dev stack for isomorphic web apps.

#### Libraries
  - Google Closure
  - Facebook React
  - Polymer Pointer Events
  - Node.js
  - [este-library](https://github.com/steida/este-library)

#### Languages
  - CoffeeScript (optional)
  - Stylus (optional)
  - CSS Less (in progress)
  - TypeScript (in progress)
  - ES6 (in progress)

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

  Start development. Build app, run development stack.

  ```gulp ```

  Start development in stage mode. Styles are minified and scripts are compiled.

  ```gulp --stage``` or ```gulp -s```

  Build app. Useful for continuous integration.

  ```gulp build``` or ```gulp build --stage```

  Run development stack. Useful to skip building phase.

  ```gulp run``` or ```gulp run --stage```

  Debug makes compiled scripts readable.

  ```gulp build --stage=debug```

### Recommended Editor: [Atom.io](http://atom.io)

## Stay Tuned

  - [twitter.com/estejs](https://twitter.com/estejs)
  - [medium.com/@steida](https://medium.com/@steida)
  - [groups.google.com/forum/#!forum/estejs](https://groups.google.com/forum/#!forum/estejs)

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.
