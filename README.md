# Este [![Build Status](https://secure.travis-ci.org/steida/este.png?branch=master)](http://travis-ci.org/steida/este) [![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este) [![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)

Robust and comfortable dev stack for [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) web apps. [Mobile first](http://www.lukew.com/ff/entry.asp?933), [offline first](https://developer.chrome.com/apps/offline_apps), [frontend first](http://frontendfirst.com).

#### Demos
  - [TodoMVC](http://steida-este-todomvc.jit.su/), [repo](https://github.com/steida/este-todomvc)
  - [Songary](https://github.com/steida/songary) (under development, will be released soon)

#### Libraries
  - [Google Closure](https://developers.google.com/closure/library/)
  - [Facebook React](http://facebook.github.io/react/)
  - [Polymer Pointer Events](http://www.polymer-project.org/platform/pointer-events.html)
  - [este-library](https://github.com/steida/este-library)

#### Languages
  - You can use [CoffeeScript](coffeescript.org) (compatible with [Closure Compiler](https://developers.google.com/closure/compiler/)), if you like
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
  [Java 1.7+](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and [Node.js](http://nodejs.org) are required.
  ```shell
  npm install -g gulp
  npm install -g bower
  ```
  
For Windows users, because jsdom installation sucks, you have to install Visual Studio Express 2012 C++ (it's free) before. Remember, install right 32/64 bit versions depending on your Windows.

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

### Error: EMFILE Issue

OSX has default limit for opened files set to 256. Fix it with ```ulimit -n 10000```

## Stay Tuned

  - [twitter.com/estejs](https://twitter.com/estejs)
  - [medium.com/@steida](https://medium.com/@steida)
  - [facebook.com/groups/110240425784074](https://www.facebook.com/groups/110240425784074/)
  - [groups.google.com/forum/#!forum/estejs](https://groups.google.com/forum/#!forum/estejs)

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.
