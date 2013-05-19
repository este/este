# Este - robust, modular, comfortable [![Build Status](https://secure.travis-ci.org/Steida/este.png?branch=master)](http://travis-ci.org/Steida/este)

Este is robust, modular and comfortable dev stack for web apps development with several unique features. [Demos](http://este.jit.su).

  - statically compiled [CoffeeScript](http://coffeescript.org)
  - [Google Closure Tools](https://developers.google.com/closure)
    - [Library](https://developers.google.com/closure/library)
    - [Compiler](https://developers.google.com/closure/compiler)
    - [Templates](https://developers.google.com/closure/templates)
  - [Este library](https://github.com/Steida/este-library)
    - Este MVC [framework](https://github.com/Steida/este-library/tree/master/app)
  - TDD ready, unit testing via [Mocha](http://visionmedia.github.io/mocha)
  - [Stylus](http://learnboost.github.io/stylus) styles
  - [Express](http://expressjs.com) app boilerplate
  - powerful internalization and localization
  - driven by [Grunt](http://gruntjs.com)
  - LiveReload included
  - snippets and settings for [SublimeText](http://www.sublimetext.com)

## Install
  [Node.js](http://nodejs.org) is required. Ensure you have grunt-cli and bower modules installed.
  ```shell
  npm install -g grunt-cli
  npm install -g bower
  ```

  Now, you can install Este.
  ```shell
  git clone https://github.com/Steida/este.git
  cd este
  npm install
  bower install
  ```

#### For Windows Users
  - install Java, Python 2 (Python 3 does not work)
  - set environment variables for Python and Java
  - http://docs.python.org/using/windows.html#excursus-setting-environment-variables

## Getting Started
  - run ```grunt```
  - point your browser to [localhost:8000](http://localhost:8000)
  - build something beautiful

## Usage

  Start development. Build app, run development stack.

  ```
  grunt
  ```

  Start development in stage mode. Styles are minified and scripts compiled.

  ```grunt --stage```

  Build app. Useful for continuous integration.

  ```grunt build``` or ```grunt build --stage```

  Run development stack. Useful to skip building phase.

  ```grunt run``` or ```grunt run --stage```

  Debug makes Closure Compiled code readable.

  ```grunt build --stage=debug```

  Extract messages.

  ```grunt esteExtractMessages```

  Compile with localized messages.

  ```grunt esteBuilder:appLocalized```

### Recommended Editor: [Sublime Text](http://www.sublimetext.com)

Must-have Packages

  - [Sublime Package Control](http://wbond.net/sublime_packages/package_control)
  - CoffeeScript
  - Stylus
  - [github.com/anvie/SoyTemplate](https://github.com/anvie/SoyTemplate)
  - Clipboard History
  - JsFormat

My Sublime Text [settings and snippets](https://github.com/Steida/Sublimetext-user-settings).
Code snippets [cheat sheet](http://estejs.tumblr.com/post/29363589575/este-js-sublime-text-code-snippets-cheat-sheet).

## Stay Tuned

  - [twitter.com/estejs](https://twitter.com/estejs)
  - [groups.google.com/forum/#!forum/estejs](https://groups.google.com/forum/#!forum/estejs)
  - [estejs.tumblr.com](http://estejs.tumblr.com)

## Tips

  - learn ```npm link``` and ```bower link```
  - from time to time delete bower_components and node_component dirs, then run npm install and bower install, to update dev stack and its dependencies

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.