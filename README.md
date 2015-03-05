# Este.js

> Robust and comfortable dev stack for isomorphic web apps. Forget about over-abstracted frameworks, use sheer libraries and leverage standards.

[![Circle CI](https://circleci.com/gh/steida/este.svg?style=svg)](https://circleci.com/gh/steida/este)
[![Join the chat at https://gitter.im/steida/este](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/steida/este)
[![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este)
[![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Prerequisites

Install [iojs](https://iojs.org/) or [node.js](http://nodejs.org).
Then install [gulp.js](http://gulpjs.com/).
```shell
npm install -g gulp
```

## Create App

```shell
git clone https://github.com/steida/este.git myapp
cd myapp
npm install
```

## Start Development

- run `gulp`
- point your browser to [localhost:8000](http://localhost:8000)
- build something beautiful

## Other Dev Tasks

- `gulp` or `npm run dev` run app in development mode
- `gulp -p` or `npm start` run app in production mode
- `gulp build -p` or `npm run build` just build app for continuous integration
- `gulp test` or `npm test` run tests

## Examples

- [Este TodoMVC](https://github.com/steida/este-todomvc)

## Todo

* [ ] [Jest](https://facebook.github.io/jest)
* [ ] [ESLint](http://eslint.org/), almost [ready](https://github.com/eslint/espree/issues/10)
* [ ] [flowtype](http://flowtype.org/)
* [ ] Sync app state across browser tabs/windows via http://goo.gl/Pt8NFQ
* [ ] Global app errors handling with several lst app states reporting.
* [ ] Consider async actions and [CSP channels](https://github.com/ubolonton/js-csp), [video](https://www.youtube.com/watch?v=W2DgDNQZOwo&list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr&index=6).
* [ ] [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
* [ ] React 0.13 [plain JS class](http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#plain-javascript-classes).
* [ ] An optional Closure Tools support.

## Wishlist
 
## Credit

made by [steida](https://twitter.com/steida)
