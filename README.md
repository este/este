<img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515265/b91f0fb8-c388-11e4-857e-c90902e0b7a1.png" width="200">

[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Join the chat at https://gitter.im/este/este](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)
[![GitHub license](https://img.shields.io/github/license/este/este.svg)](https://github.com/este/este/blob/master/LICENSE)

> Happily maintained dev stack and starter kit for React universal apps. One stack for browser, server, mobile. Forget about [evil frameworks](http://tomasp.net/blog/2015/library-frameworks/), use laser focused [libraries](https://github.com/este/este#libraries) and design patterns instead.

> You don't have to start with everything. Este is perfect even for plain static pages. You can gracefully add any platform later. Este mission is simple: **Help startups to deliver minimal valuable product asap with the state of the art real-time universal app stack**.

> Nejbližší **školení Este.js** se koná 23. a 24. června v Praze. Cena je 11 500 Kč. Registrujte se přes [learn-reactjs.com](https://learn-reactjs.com/), nebo mi napište: daniel@steigerwald.cz.

## Techniques

- Truly universal architecture
  - code shared across platforms (browser, server, native mobile)
  - server side rendering
  - universal data fetching (unique approach without react-router)
  - an optional rendering to HTML files (for static hostings)
  - universal internationalization with runtime language switching
  - universal crash reporting via Sentry
  - universal forms with universal validation (universal ftw, yeah)
- Functional works (immutability, hot reload, time traveling)
- Test driven development
- Advanced performance with pure components
- Well tuned dev stack (OS X, Linux, Windows)
- Firebase Redux integration ([este.firebaseapp.com](https://este.firebaseapp.com))
  - useful predefined actions
  - email and facebook login
  - declarative queryFirebase higher order component for Firebase imperative api
- Este is monorepo, [read](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) [why](http://danluu.com/monorepo/).

## Libraries

- [react](http://facebook.github.io/react/) and [react native](https://facebook.github.io/react-native/)
- [redux](http://rackt.github.io/redux/)
- [babeljs](https://babeljs.io/)
- [immutablejs](http://facebook.github.io/immutable-js)
- [react-router](https://github.com/rackt/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [react-intl](https://github.com/yahoo/react-intl)
- [redux-storage](https://github.com/michaelcontento/redux-storage)
- [webpack](http://webpack.github.io/)
- [expressjs](http://expressjs.com/)
- [eslint](http://eslint.org/)
- [formatjs](http://formatjs.io/) Universal internationalization.
- [react-helmet](https://github.com/nfl/react-helmet) A document head manager for React.
- [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
- [chriso/validator.js](https://github.com/chriso/validator.js) For simple yet powerfull Este sync/async validation.
- [bluebird](https://github.com/petkaantonov/bluebird) Because it's better than native implementation.
- [mochajs](https://mochajs.org/) The fun, simple, flexible JavaScript test framework.
- SASS or plain CSS with [autoprefixer](https://github.com/postcss/autoprefixer)
- [shortid](https://github.com/dylang/shortid) Short id generator. Url-friendly. Non-predictable.
- [gulp](http://gulpjs.com/) Aren't NPM scripts better? [No](https://twitter.com/jaffathecake/status/700320306053935104).
- [raven-js](https://github.com/getsentry/raven-js) Crash reporting client for [Sentry](https://getsentry.com).
- [gulp-real-favicon](https://www.npmjs.com/package/gulp-real-favicon) Generate a multiplatform favicon with [RealFaviconGenerator](https://realfavicongenerator.net)
- And much more. Explore the repository.

## Prerequisites

- [node.js](http://nodejs.org) Node 6 with NPM 3 is required.
- [gulp](http://gulpjs.com/) `npm install -g gulp`

#### Optional

- [firebase-cli](https://firebase.google.com/docs/cli/) `npm install -g firebase-tools`
- [react-native-cli](http://facebook.github.io/react-native/docs/getting-started.html) `npm install -g react-native-cli`

If you are using different node versions on your machine, use [nvm](https://github.com/creationix/nvm) to manage them.

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

React Native: [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)

## Dev Tasks

- `gulp` run web app in development mode
- `gulp ios` run iOS app in development mode
- `gulp android` run Android app in development mode
- `gulp -p` run web app in production mode
- `gulp mocha` run mocha unit tests
- `gulp mocha-watch` continuous test running for TDD
- `gulp eslint` eslint
- `gulp eslint --fix` fix fixable eslint issues
- `gulp messages-extract` extract messages for translation
- `gulp messages-check` check missing and unused translations
- `gulp favicon` create multiplatform favicon

## Production Tasks

- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV and SERVER_URL
- `gulp to-html` render app to HTML for static hosting like [Firebase](https://www.firebase.com/features.html#features-hosting)
- `gulp deploy-heroku` deploy [Heroku](https://www.heroku.com/) app
- `gulp deploy-firebase` deploy [Firebase](https://firebase.google.com/) app
- `gulp deploy-firebase-database` deploy Firebase database only

## Documentation

For absolute beginners, see: [react-howto](https://github.com/petehunt/react-howto).

So you've decided to give this web stack a chance, but where is the documentation? Code is documentation in itself as it illustrates various patterns, but to start with you should educate yourself on [React.js](http://facebook.github.io/react/) and [Redux](http://redux.js.org/). You should [learn ES6](https://babeljs.io/docs/learn-es6/) to refresh your knowledge about "new" JavaScript practices and syntax. This stack uses [immutable.js](http://facebook.github.io/immutable-js/) and class-less design for a [good reason](https://github.com/facebook/immutable-js/#the-case-for-immutability). [Express.js](http://expressjs.com/) is used on the [Node.js](http://nodejs.org/api/) based server. The application architecture is [universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) so we can share code between the browser, server, & mobile platform easily. Congrats, you're Este.js expert level 1 now :-)

## Links

- [wiki](https://github.com/este/este/wiki)
- [twitter.com/estejs](https://twitter.com/estejs)

## Windows

Use this if you are using JEST or another library, which has to be compiled.

- Install Python - Install version 2.7 of Python and add it to your path or/and create a PYTHONPATH environment variable.
- Install Visual Studio (Express Edition is fine) - We will need this for some of modules that are compiled when we are installing Este. [Download VS Express](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx), get one of the versions that has C++ - Express 2013 for Windows Desktop for example.
- Set Visual Studio Version Flags - We need to tell node-gyp (something that is used for compiling addons) what version of Visual Studio we want to compile with. You can do this either through an environment variable GYP_MSVS_VERSION. If you are using Express, you have to say GYP_MSVS_VERSION=2013e.

Thanks to [Ryanlanciaux](http://ryanlanciaux.github.io/blog/2014/08/02/using-jest-for-testing-react-components-on-windows/)

## Tips and Tricks

- Open developer console to check current app state.
- With functional programming ([SOLID: the next step is Functional](http://blog.ploeh.dk/2014/03/10/solid-the-next-step-is-functional)), we don't need DI containers. We can use plain old [Pure DI](http://blog.ploeh.dk/2014/06/10/pure-di/). Check `injectMiddleware` in `configureStore`.
- Learn immutable.js, for example [Seq](https://github.com/facebook/immutable-js#lazy-seq). Handy even for native arrays and objects. For example, get object values: `Seq(RoomType).toSet().toJS()`
- Recommended editor is [Atom](https://atom.io). Check [settings](https://github.com/este/este/wiki/Recommended-Atom.io-Settings).
- In Chrome, when hot reloading doesn't work, do manual reload (CMD-R) only once. Chrome will update itself ASAP automatically.

## FAQ

#### Why do I get EACCES error during `npm install`?
 This indicates that you do not have permission to write to the directories that npm uses to store packages and commands. One possible solution is to change the permission to npm's default directory.
 1. Find the path to npm's directory:  `npm config get prefix`  For many systems, this will be `/usr/local`
 2. Change the owner of npm's directory's to the effective name of the current user
 ```
 sudo chown -R `whoami` <directory>
 ```

#### Why does the CSS flicker when starting the app/refreshing it?
In dev mode, webpack loads all the styles inline, which makes them hot reloadable. This behaviour disappears in production mode (`gulp -p`).

#### Does Hapi/SailJS/Restify/Rails work with Este? Do you have any example app for this framework?
Yes it does. Este is agnostic of what you use in your backend and is completely decoupled from the API. It uses an Express app for server-side rendering, but you can use anything for your API. The only benefit that an Express API has is that it can simply be called with a `use()` statement by the main app, just like any other middleware.

#### Is it possible use XYZ library with Este?
Yes. Este tries to make as few assumptions about your stack as possible. This is not a framework, nothing prevents you from picking the bits you're interested in.

#### How is React Native used in this project?
In the same way as any other React Native project is created via `react-native init AwesomeProject`. But thanks to the universal application design we can easily share modules across platforms. But remember to check [gulpfile.babel.js](https://github.com/este/este/blob/master/gulpfile.babel.js) for details.

## Training
- [learn-reactjs.com](http://www.learn-reactjs.com)
- [javascript-skoleni.cz](http://javascript-skoleni.cz)

## Support Este development

<img alt="Support Este development QR code" src="http://i.imgur.com/btUZ0IU.png" width="115" height="115">

## Credit

<img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515278/de638916-c388-11e4-8754-184f5b11e770.jpeg" width="200">

Made by Daniel Steigerwald, [twitter.com/steida](https://twitter.com/steida) and the community.
