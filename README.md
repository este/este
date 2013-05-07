# Este - robust, modular, comfortable [![Build Status](https://secure.travis-ci.org/Steida/este.png?branch=master)](http://travis-ci.org/Steida/este)

Este is robust, modular and comfortable dev stack for web apps development with several unique features. [Demo](http://este.jit.su).

  - statically compiled CoffeeScript
  - Google Closure Tools
  - [Este library](https://github.com/Steida/este-library)
    - Este MVC framework
    - other interesting stuff
  - TDD ready, [Mocha](http://visionmedia.github.io/mocha)
  - Stylus styles
  - Soy templates (the most safe and fast JavaScript templates)
  - simple Express app boilerplate
  - powerfull internalization and strings localization
  - driven by [Grunt](http://gruntjs.com)
    - all sources are compiled on file change
  - snippets and settings for Sublime Text

## Install
  [Node.js](http://nodejs.org) is required. Please, ensure you have also grunt-cli and bower modules installed.
  ```javascript
  npm install -g grunt-cli
  npm install -g bower
  ```

  Now, you can install Este easily.

  ```javascript
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
  - run ```grunt```, or ```grunt --stage```
  - point your browser to [localhost:8000](http://localhost:8000/)
  - build something beautiful

## Usage

Start development.

```grunt run:app``` or just ```grunt```

Build project for continuous integration. No file watchers nor server.

```grunt build:app```

Start development in stage mode, code is compiled with Closure Compiler.

```grunt run:app --stage```

Debug makes compiled code readable.

```grunt run:app --stage=debug```

Default task is alias for run:app.

```grunt``` or ```grunt --stage``` or ```grunt --stage=debug```

No color means no friendly beeps too.

```grunt --no-color```

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

Recommended Packages

  - [github.com/vojtajina/sublime-OpenRelated](https://github.com/vojtajina/sublime-OpenRelated)
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