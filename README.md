# Este - robust, modular, comfortable

Este is dev stack for web apps development with some unique features.

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
  npm install
  bower install
  grunt
  ```

#### For Windows Users
  - Install Java (latest), Python 2
  - Set environment variables for Python and Java
  - http://docs.python.org/using/windows.html#excursus-setting-environment-variables

## Usage

  Start simple static server in another cmd window.
  ```grunt connect```

  Start development. Compile all and start watching.
  ```grunt run:app```

  Compiles code with closureBuilder.
  ```grunt run:app --stage```

  Debug makes compiled code readable.
  ```grunt run:app --stage=debug```

  Default task runs grunt run:app.
  ```grunt```
  ```grunt --stage```
  ```grunt --stage=debug```

  No color means no friendly beeps too.
  ```grunt --no-color```

  Extract messages.
  ```grunt esteExtractMessages```

  Compile with localization.
  ```grunt esteBuilder:appLocalized```

  If you have Java 1.7+, enable fastCompilation option in gruntfile.coffee.
  It's huge speed improvement for Google Closure Compiler. From 13s to 3s in
  my case.

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