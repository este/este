# <a href="https://este.herokuapp.com/"><img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515265/b91f0fb8-c388-11e4-857e-c90902e0b7a1.png" width="200"></a>

> Robust and comfortable dev stack for isomorphic web apps. Forget about over abstracted frameworks. It's better to learn patterns with practiques and apply them on laser focused libraries.

[![Circle CI](https://circleci.com/gh/steida/este.svg?style=svg)](https://circleci.com/gh/steida/este)
[![Join the chat at https://gitter.im/steida/este](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/steida/este)
[![Dependency Status](https://david-dm.org/steida/este.png)](https://david-dm.org/steida/este)
[![devDependency Status](https://david-dm.org/steida/este/dev-status.png)](https://david-dm.org/steida/este#info=devDependencies)
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Techniques

- ES6 and future JavaScripts via [babeljs.io](https://babeljs.io/), JSX and flowtype syntax supported as well.
- Server side rendering.
- Mobile first, offline first, frontend first.
- Localization with [formatjs.io](http://formatjs.io/), stale browsers supported as well.
- React with Flux with immutable global app state.
- Isomorphic architecture with stateless actions and stores.
- Still vanilla Flux. You don't need over-abstracted frameworks.
- Webpack css livereaload with hot module reload even for React components.
- Easy undo/redo and app state load/save.
- Super fast performance with immutable.js.
- Well tuned webpack devstack.
- Stylesheets can be CSS, LESS, SASS or Stylus.

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

- [Empty Este.js App](https://este.herokuapp.com)
- [Este TodoMVC](https://github.com/steida/este-todomvc)

## Documentation

tl;dr - open [este.herokuapp.com/todos](https://este.herokuapp.com/todos)

So you decided to give a chance to this web stack, but where is documentation? Code is documentation itself as it illustrates various patterns, but for start you should read something about [React.js](http://facebook.github.io/react/). Then you should learn [what is the Flux
application architecture](https://medium.com/brigade-engineering/what-is-the-flux-application-architecture-b57ebca85b9e). Now refresh you JavaScript knowledge about "new" JavaScript - [learn ES6](https://babeljs.io/docs/learn-es6/). This stack uses [immutable.js](http://facebook.github.io/immutable-js/) and for a [good reason](https://github.com/facebook/immutable-js/#the-case-for-immutability). Check this nice short [video](https://www.youtube.com/watch?v=5yHFTN-_mOo Ok, Server side you.http://expressjs.com/), to see one of many great advantages of [functional programming](http://www.smashingmagazine.com/2014/07/02/dont-be-scared-of-functional-programming/). [Express.js](http://expressjs.com/) is used on the [Node.js](http://nodejs.org/api/) based server. Application is [isomorphic](http://isomorphic.net/javascript), so can share code between client and server easily.

## Links

- [stackoverflow.com/questions/tagged/estejs](http://stackoverflow.com/questions/tagged/estejs)
- [twitter.com/estejs](https://twitter.com/estejs)

## Todo

* [ ] [Jest](https://facebook.github.io/jest)
* [ ] [ESLint](http://eslint.org/), almost [ready](https://github.com/eslint/espree/issues/10)
* [ ] [flowtype](http://flowtype.org/)
* [ ] Sync app state across browser tabs/windows via [broadcastpubsub.js](http://goo.gl/Pt8NFQ)
* [ ] Global errors handling with several last app states reporting.
* [ ] Consider async actions and [CSP channels](https://github.com/ubolonton/js-csp), [video](https://www.youtube.com/watch?v=W2DgDNQZOwo&list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr&index=6).
* [ ] [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
* [ ] React 0.13 [plain JS class](http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#plain-javascript-classes). It supports immutable.js out of the box.
* [ ] Optional Closure Tools support.
* [ ] Async and pendings actions.
* [ ] React inline styles with tools.
* [ ] Add responsiveness.
* [ ] Add gestures.

## Tips and Tricks and Lips and Tits

- With global immutable app state, you don't need IoC container. [SOLID: the next step is Functional ](http://blog.ploeh.dk/2014/03/10/solid-the-next-step-is-functional).
- Use `const` for CONSTANTS or immutable structures.
- Always use React propTypes.
- Never mock browser inside server code, it can confuse isomorphic libraries.
- Always use settostring helper.
- [aeflash.com/2015-02/react-tips-and-best-practices.html](http://aeflash.com/2015-02/react-tips-and-best-practices.html)

## Credit

# <img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515278/de638916-c388-11e4-8754-184f5b11e770.jpeg" width="200">

made by [twitter.com/steida](https://twitter.com/steida)
