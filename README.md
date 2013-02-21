# Este - robust, modular, comfortable [![Build Status](https://secure.travis-ci.org/Steida/este.png?branch=master)](http://travis-ci.org/Steida/este)

Este is robust, modular and comfortable dev stack for web apps development with several unique features.

  - statically compiled CoffeeScript
  - Google Closure Tools
  - Mocha tests
  - Stylus styles
  - Node.js server for development
  - Este.js framework
    - MVC framework
    - quite a lot useful classes
  - settings and snippets for Sublime Text

## Install
  ```javascript
  git clone https://github.com/Steida/este.git
  cd este
  npm install
  bower install
  ```

  Don't forget to install ```npm install grunt-cli -g```.

#### For Windows Users
  - Install Java (latest), Python 2
  - Set environment variables for Python and Java
  - http://docs.python.org/using/windows.html#excursus-setting-environment-variables

## Getting Started
  Run ```grunt```, then open another cmd window and there run ```grunt connect```.
  Point your browser to `localhost:8000`.
  Build something beautiful.

## Usage

  Start development.

  ```grunt run:app``` or just ```grunt```

  Build project for continuous integration. No file watchers.

  ```grunt build:app```

  Start simple static server in another cmd window.

  ```grunt connect```

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

  If you have Java 1.7+, enable fastCompilation option in gruntfile.coffee.
  It's huge speed improvement for Google Closure Compiler. From 13s to 3s in
  my case for example.

### Recommended Editor: [Sublime Text](http://www.sublimetext.com)

Must-have Packages

  - Package Control
  - CoffeeScript
  - Stylus
  - SoyTemplate (github.com/anvie/SoyTemplate)

Recommended Packages

  - Open Related (github.com/vojtajina/sublime-OpenRelated)
  - Clipboard History
  - JsFormat

My Sublime Text settings and snippets are [here](https://github.com/Steida/Sublimetext-user-settings).
Code snippets [cheat sheet](http://estejs.tumblr.com/post/29363589575/este-js-sublime-text-code-snippets-cheat-sheet).

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.