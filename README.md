# Este [![Build Status](https://secure.travis-ci.org/steida/este.png?branch=master)](http://travis-ci.org/steida/este) [![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este) [![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)

Robust and comfortable dev stack for web app development.

## Why Este.js?

I believe static typing makes code more robust and readable while CoffeeScrips makes code more concise.
I designed Este MVC with touch devices and good UX in mind. I prefer Closure Library, it's
huge, mature, and well written. Closure Compiler extraordinery level of minification is win for mobile apps.
Facebook React is brilliant for building dynamic UI's. Polymer PointerGestures rocks. Unit tests must be
light-fast and automatic. Well tunned dev stack is important. And more.

#### Features

  - statically compiled JavaScript or [CoffeeScript](http://coffeescript.org)
  - desktop, tablet, mobile supported
  - pure client side technology, any backend is supported
  - powerful development stack build on top of [gruntjs.com](gruntjs.com)
    - [grunt-este](https://github.com/steida/grunt-este)
    - fast file [watcher](https://github.com/steida/grunt-este-watch/) without pooling and with LiveReload
  - [Este library](https://github.com/steida/este-library)
    - Este App MVC [framework](https://github.com/steida/este-library/tree/master/este/app)
    - UI components and other handy stuff
  - TDD ready, fast unit testing via [Mocha](http://visionmedia.github.io/mocha)
  - great internalization and strings localizations support
  - snippets and settings for [SublimeText](http://www.sublimetext.com)
  - server Express App boilerplate
  - third parties:
    - [Google Closure Tools](https://developers.google.com/closure)
      - [Library](https://developers.google.com/closure/library)
      - [Compiler](https://developers.google.com/closure/compiler)
      - [Templates](https://developers.google.com/closure/templates)
    - [Stylus](http://learnboost.github.io/stylus) styles
    - Node.js [Express](http://expressjs.com)
    - Google [Polymer](http://www.polymer-project.org/)
    - Facebook [React](http://facebook.github.io/react/)

#### Development Stack

  - watch changes, check syntax, and compile
    - CoffeeScript
    - Stylus
    - Closure Templates
  - run very fast unit tests immediately after file save
  - calculate and resolve module dependencies
  - extract and inject strings for localizations
  - run development server
  - join and minify css
  - compile JavaScript
  - update running app styles without browser reload (LiveReload)
  - reload browser and server when needed
  - prepare app for production

## Prerequisites
  [Node.js](http://nodejs.org) is required. Ensure also you have ```grunt-cli``` and ```bower``` installed.
  ```shell
  npm install -g grunt-cli
  npm install -g bower
  ```

#### For Windows Users
  - install Java and Python 2 (Python 3 does not work)
  - set environment variables for Python and Java
  - http://docs.python.org/using/windows.html#excursus-setting-environment-variables

## Getting Started

### Create Este App
  
  ```shell
  git clone https://github.com/steida/este.git este-app
  cd este-app
  npm install
  bower install
  ```
  
### Start Development

  - run ```grunt```
  - point your browser to [localhost:8000](http://localhost:8000)
  - build something beautiful

## How to Learn Este

  Take a look at project structure. ```server``` directory contains server-side backend code, in this case
  it's Node.js Express server, but we can use any backend of course. Este is client-side technology
  and it's possible to create Este app that don't require any backend at all.

  ```client``` directory contains client-side apps. By default, only ```app``` is needed. But it's not rare that
  our project needs several separated sub-projects, for example: ```site```, ```app```, ```administration```.

  Take a look at app entry point [start.coffee](https://github.com/steida/este/blob/master/client/app/js/start.coffee),
  check Este [demos](https://github.com/steida/este-library/tree/master/este/demos) or [TodoMVC demo](https://github.com/steida/este-library/tree/master/este/demos/app/todomvc).
  Learn from well documented source code and demos.

## Usage

  Start development. Build app, run development stack.

  ```grunt ```

  Start development in stage mode. Styles are minified and scripts are compiled.

  ```grunt --stage```

  Build app. Useful for continuous integration.

  ```grunt build``` or ```grunt build --stage```

  Run development stack. Useful to skip building phase.

  ```grunt run``` or ```grunt run --stage```

  Debug makes compiled scripts readable.

  ```grunt build --stage=debug```

  Extract messages for localization.

  ```grunt esteExtractMessages```

  Compile project with localized messages.

  ```grunt esteBuilder:appLocalized```

### Recommended Editor: [Sublime Text](http://www.sublimetext.com)

Must-have Packages

  - [Sublime Package Control](http://wbond.net/sublime_packages/package_control) (read instructions)
  - CoffeeScript
  - Stylus
  - [github.com/anvie/SoyTemplate](https://github.com/anvie/SoyTemplate) (read instructions)
  - Clipboard History
  - JsFormat
  - EditorConfig

My Sublime Text [settings and snippets](https://github.com/steida/Sublimetext-user-settings).
Code snippets [cheat sheet](http://estejs.tumblr.com/post/29363589575/este-js-sublime-text-code-snippets-cheat-sheet).

## Stay Tuned

  - [twitter.com/estejs](https://twitter.com/estejs)
  - [estejs.tumblr.com](http://estejs.tumblr.com)
  - [groups.google.com/forum/#!forum/estejs](https://groups.google.com/forum/#!forum/estejs)

## Tips

  - watch [github.com/steida/este-library](https://github.com/steida/este-library) for updates
  - learn ```npm link``` and ```bower link``` and use it with your npm modules and bower libraries
  - learn ```bower link``` and keep your ```este-library``` fresh

## License
Copyright (c) 2013 Daniel Steigerwald

Licensed under the MIT license.
