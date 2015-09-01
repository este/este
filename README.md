<a href="https://este.herokuapp.com/"><img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515265/b91f0fb8-c388-11e4-857e-c90902e0b7a1.png" width="200"></a>

[![Circle CI](https://circleci.com/gh/este/este.svg?style=svg)](https://circleci.com/gh/este/este)
[![Join the chat at https://gitter.im/este/este](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

> The most complete React/Flux dev stack and starter kit for universal functional web apps. Forget about [evil frameworks](http://tomasp.net/blog/2015/library-frameworks/), learn laser focused libraries and patterns instead.

## Techniques

- Universal JavaScript (formerly isomorphic), one dev stack for browser, server, desktop, mobile.
- Functional works: App state snapshots, time travel, hot reload everything.
- [React](http://facebook.github.io/react/) with server side rendering on [expressjs](http://expressjs.com/) backend.
- Super minimal [Flux](https://facebook.github.io/flux/) with atomic [immutable.js](http://facebook.github.io/immutable-js) app state for fast rendering and sane state management.
- ECMAScript 2015+ with [babeljs.io](https://babeljs.io/). [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) and [Flowtype](http://flowtype.org/) syntax supported. Sourcemaps are enabled by default.
- Well tuned [webpack](http://webpack.github.io/) dev stack with handy [notifier](https://github.com/mikaelbr/node-notifier). TDD ready.
- [Karma](http://karma-runner.github.io/) as the test runner, [mocha](http://mochajs.org/) as test framework, and [Chai](http://chaijs.com/) as BDD / TDD assertion library.
- [Shallow rendering](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) for testing React components without DOM.
- [eslint](http://eslint.org/) ES6 linting with [React](https://github.com/yannickcr/eslint-plugin-react) JSX support. ([Sublime Text 3 integration](https://github.com/steida/este/wiki/Recommended-Sublime-Text-3-settings#how-to-setup-the-eslint-for-st3))
- Localization via [formatjs.io](http://formatjs.io/), stale browsers supported as well.
- [react-router](https://github.com/rackt/react-router) for routing on client and server side.
- Simple yet powerfull sync/async validation based on famous [chriso/validator.js](https://github.com/chriso/validator.js)
- Auth example with `requireAuth` [higher order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) to protect access to specific pages.
- LESS, SASS, Stylus, or plain CSS with [autoprefixer](https://github.com/postcss/autoprefixer).
- Easy undo/redo and load/save for app state.
- Long Term Caching through file hashes enabled.

## Prerequisites

Install [node.js](http://nodejs.org).
Then install [gulp.js](http://gulpjs.com/).
```shell
npm install -g gulp
```

#### Windows

Use this if you are using JEST or another library, which has to be compiled.

- Install Python - Install version 2.7 of Python and add it to your path or/and create a PYTHONPATH environment variable.
- Install Visual Studio (Express Edition is fine) - We will need this for some of modules that are compiled when we are installing Este. [Download VS Express](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx), get one of the versions that has C++ - Express 2013 for Windows Desktop for example.
- Set Visual Studio Version Flags - We need to tell node-gyp (something that is used for compiling addons) what version of Visual Studio we want to compile with. You can do this either through an environment variable GYP_MSVS_VERSION. If you are using Express, you have to say GYP_MSVS_VERSION=2013e.

Thanks to [Ryanlanciaux](http://ryanlanciaux.github.io/blog/2014/08/02/using-jest-for-testing-react-components-on-windows/)

## Create App

```shell
git clone https://github.com/este/este.git este-app
cd este-app
npm install
```

## Start Development

- run `gulp`
- point your browser to [localhost:8000](http://localhost:8000)
- build something beautiful

## Dev Tasks

- `gulp` run app in development mode
- `gulp -p` run app in production mode
- `gulp test` run eslint, karma-ci, webpack build for production
- `gulp tdd` run app in dev mode with Karma configured for test driven development

## CI Tasks

- `npm start` just run app, remember to set NODE_ENV=production and others environment variables.
- `npm postinstall` just alias for `gulp build --production`, useful for Heroku.
- `npm test` just alias for `gulp test`

## Documentation

So you decided to give a chance to this web stack, but where is documentation? Code is documentation itself as it illustrates various patterns, but for start you should read something about [React.js](http://facebook.github.io/react/). Then you should learn [what is the Flux
application architecture](https://medium.com/brigade-engineering/what-is-the-flux-application-architecture-b57ebca85b9e). Now refresh you JavaScript knowledge about "new" JavaScript - [learn ES6](https://babeljs.io/docs/learn-es6/). This stack uses [immutable.js](http://facebook.github.io/immutable-js/) and class-less design for a [good reason](https://github.com/facebook/immutable-js/#the-case-for-immutability). Check this nice short [video](https://www.youtube.com/watch?v=5yHFTN-_mOo), wouldn't be possible with classic OOP classes everywhere approach. Functional programming is a next (current) big thing, read [why](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd). [Express.js](http://expressjs.com/) is used on the [Node.js](http://nodejs.org/api/) based server. Application is [universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9), so we can share code between browser, server, mobile, whatever easily. Congrats, you're Este.js expert level 1 now :-)

## Este.js in one minute

Most of the app shouldn't surprise you, if you are acquainted with technologies described in  [Documentation](https://github.com/este/este#documentation). But here is how you can use our Flux implementation.

**Creating an action**

Add a method to the returned object of any `action.js` file:
```javascript
updateFavouriteTodo(newTodoValue) {
  // Some validation.
  if (!newTodoValue) {
    // We can dispatch as many actions as we want, it's quite handy for complicated actions.
    dispatch(actions.warnUser, 'Your favourite todo cannot be empty.');
  }

  // Dispatch the action and its payload.
  dispatch(actions.updateFavouriteTodo, newTodoValue);
}
```

**Updating a store with an action**

Add a `case` to the switch of the corresponding store:
```javascript
case actions.updateFavouriteTodo: {
  // The state before the action is a parameter of the store function.
  // All we need to do is to modify the state to reflect the modifications of the store.
  return state.set('favTodo', new Todo(payload));
}
```

**Using an action from a component**

The root `app.react.js` component creates actions and passes then to its children.
```js
// todos/index.react.js
render() {
  const {actions} = this.props;

  return (
    <FavouriteTodo actions={actions.todos}/>
  )
}

// todos/favouritetodo.react.js
export default class FavouriteTodo extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  onEdit(newTodo) {
    const {actions} = this.props;

    // It's just a function. It can't be simpler.
    actions.updateFavouriteTodo(newTodo);
  }
}
```

**Accessing data/state from a component**

It works just like with the actions. `app.react.js` has access to the whole state, and can pass it to its children. So just pass everything through props.

## Links

- [wiki: Recommended React Components](https://github.com/steida/este/wiki/Recommended-React-Components)
- [wiki: Recommended Sublime Text 3 Packages](https://github.com/steida/este/wiki/Recommended-Sublime-Text-3-settings)
- [twitter.com/estejs](https://twitter.com/estejs)
- [github.com/enaqx/awesome-react](https://github.com/enaqx/awesome-react)

## Tips and Tricks

- To check app state, press `ctrl+shift+s`, then open console.
- With global app state, we don't need IoC container so badly - [SOLID: the next step is Functional](http://blog.ploeh.dk/2014/03/10/solid-the-next-step-is-functional). Still DI is relevant for some cases and then use [Pure DI](http://blog.ploeh.dk/2014/06/10/pure-di/).
- Learn immutable.js, for example [Seq](https://github.com/facebook/immutable-js#lazy-seq). Very handy even for native arrays and objects. For example, get object values: `Seq(RoomType).toSet().toJS()`
- Even though we can use `import {canUseDOM} from 'react/lib/ExecutionEnvironment'` to detect browser/server, don't do it since it's runtime value. Use webpack DefinePlugin to set `process.env.IS_BROWSER` rather, because compilation removes dead code.
- How to use Closure Tools, [gist](https://gist.github.com/steida/afbc595a1e2f27e925d9)
- Recommended editors are [sublimetext](http://www.sublimetext.com/) and [atom.io](https://atom.io) ([tips](https://github.com/steida/atom-io-settings)).
- When `gulp` command fails with `No gulpfile found`. Problem is with gulp version on your system. Simple fix: https://github.com/gulpjs/gulp-cli/issues/27#issuecomment-116134527

## FAQ
#### Why does the CSS flicker when starting the app/refreshing it?
In dev mode, webpack loads all the style inline, which makes them hot reloadable. This behaviour disappears in production mode (`gulp -p`).

#### Does Hapi/SailJS/Restify/Rails work with Este? Do you have any example app for this framework?
Yes it does. Este is agnostic of what you use in your backend and is completely decoupled from the API. It uses an Express app for server-side rendering, but you can use anything for your API. The only benefit that an Express API has is that it can simply be `use()` by the main app, like any other middleware.

#### What's the difference with [Redux](https://github.com/gaearon/redux)?
Redux aims to be the framework to rule them all. It wants to be everything for everyone, while Este assumes being strongly opinionated, needing much less boilerplate to work. Moreover, while Redux (or many other implementation of the Flux pattern) are frameworks, Este tries to simply be the show a pattern and a set of best practices.

#### Is it possible use XXX library with Este?
Yes. Este makes little assumptions about your stack, and passing every bit of needed info through props. This is not a framework, nothing prevents you from picking the bits you're interested in.

#### Do you have any other example apps using Este?
Right now, there are little open sourced apps on the web (if you have any example, feel free to send a PR, or tip us on Gitter). You can have a look at the other repositories of the [este organization](http://github.com/este). You might for instance find some interesting stuff in [este-firebase](https://github.com/este/este-firebase/).

#### Does it work with React Native?
Yes! Check the [native](https://github.com/este/native) repo.

#### Why Este is pure and why we have to pass data through props?
Pure means no side effects. Programming without side effects rocks. It allows us to hot reload everything and testing is much easier as well. When component renders only data passed through props, [shouldComponentUpdate](https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate) can be implemented [only once](https://github.com/este/este/blob/d08556dd1e4d57b4c0e605e3395ce6af9963910e/src/client/components/component.react.js#L14) per whole app. One can say it's verbose, but it isn't. It's explicit. And remember, we have to pass only data going to be rendered. Actions have access to app state.

## Training
- [learn-reactjs.com](http://www.learn-reactjs.com)
- [javascript-skoleni.cz](http://javascript-skoleni.cz)
- [DzejEs.cz](http://www.dzejes.cz) - czech articles about Este

## Notes

- Este.js dev stack works on OSX, Linux, and Windows. Feel free to report any issue.
- As a rule of thumb, Este.js supports all evergreen browsers plus last two pieces of IE.
- You can support Este.js development via Bitcoin - [daniel.steigerwald.cz/#donate-estejs](http://daniel.steigerwald.cz/#donate-estejs)

## Credit

<img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515278/de638916-c388-11e4-8754-184f5b11e770.jpeg" width="200">

made by Daniel Steigerwald, [twitter.com/steida](https://twitter.com/steida)
