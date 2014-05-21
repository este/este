# Este [![Build Status](https://secure.travis-ci.org/steida/este.png?branch=master)](http://travis-ci.org/steida/este) [![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este) [![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)

Robust and comfortable dev stack for [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) (browser + Node.js) web apps. TodoMVC [demo](http://steida-este-todomvc.nodejitsu.com).

#### Libraries
  - [Google Closure](https://developers.google.com/closure/library/)
  - [Facebook React](http://facebook.github.io/react/)
  - [Polymer Pointer Events](http://www.polymer-project.org/platform/pointer-events.html)
  - [este-library](https://github.com/steida/este-library)

#### Languages
  - [CoffeeScript](coffeescript.org) (compatible with [Closure Compiler](https://developers.google.com/closure/compiler/))
  - ECMAScript 6 (via Facebook React [jstransform](https://github.com/facebook/jstransform/tree/master/visitors/__tests__))
  - [Stylus](http://learnboost.github.io/stylus/)

#### Tools
  - Well tuned [gulp](gulpjs.com) [dev stack](https://github.com/steida/gulp-este)
  - Super fast [file-watcher](https://github.com/steida/este-watch)
  - Neat [DI Container](https://github.com/steida/gulp-closure-dicontainer)
  - Fantastic [Closure Compiler](https://developers.google.com/closure/compiler/)
  - TDD ready [Mocha](http://visionmedia.github.io/mocha)

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
  
For Windows users, how to install jsdom: [http://alexmeub.com/posts/2014-02-06-windows-npm-install-jsdom.html](http://alexmeub.com/posts/2014-02-06-windows-npm-install-jsdom.html).

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

Recommended [settings](https://github.com/steida/atom-io-settings).

## Stay Tuned

  - [twitter.com/estejs](https://twitter.com/estejs)
  - [medium.com/@steida](https://medium.com/@steida)
  - [facebook.com/groups/110240425784074](https://www.facebook.com/groups/110240425784074/)
  - [groups.google.com/forum/#!forum/estejs](https://groups.google.com/forum/#!forum/estejs)

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.
