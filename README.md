<img
  alt="Este.js"
  src="https://cloud.githubusercontent.com/assets/66249/6515278/de638916-c388-11e4-8754-184f5b11e770.jpeg"
  width="200"
/>

[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Join the chat at https://gitter.im/este/este](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)
[![GitHub license](https://img.shields.io/github/license/este/este.svg)](https://github.com/este/este/blob/master/LICENSE)

> Dev stack and starter kit for React universal apps. One stack for browser, server, mobile. Forget about [evil frameworks](http://tomasp.net/blog/2015/library-frameworks/), use laser focused [libraries](https://github.com/este/este#libraries) and design patterns instead.

> You don't have to start with everything. Este is perfect even for plain static pages. You can gracefully add any platform later. Este mission is simple: **Help startups to deliver minimal valuable product asap with the state of the art real-time universal app stack**.

> Pokud máte zájem o školení JavaScript, React.js, nebo Este.js, podívejte se na [javascript-skoleni.cz](https://javascript-skoleni.cz/).

## Techniques

- Universal architecture
  - code shared across platforms (browser, server, native mobile)
  - server side rendering or server-less pre-rendering to HTML files
  - universal routing
  - universal internationalization
  - universal crash reporting
  - universal data fetching
  - universal forms with universal validation
- Immutable app state
- Stateless functional UI components with JavaScript styles
- Flowtype
- Vanilla hot reloading makes everything hot reloadable
- [Firebase](https://firebase.google.com/) integration ([este.firebaseapp.com](https://este.firebaseapp.com))
  - email and facebook login
  - declarative queryFirebase higher order component for Firebase imperative API
  - users presence

## Libraries

- [react](http://facebook.github.io/react/) and [react native](https://facebook.github.io/react-native/)
- [redux](http://rackt.github.io/redux/)
- [redux-observable](https://github.com/redux-observable/redux-observable)
- [babeljs](https://babeljs.io/)
- [immutablejs](http://facebook.github.io/immutable-js)
- [react-router](https://github.com/rackt/react-router)
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
- [jest](https://facebook.github.io/jest/) Painless JavaScript Testing.
- SASS or plain CSS with [autoprefixer](https://github.com/postcss/autoprefixer)
- [uuid](https://github.com/defunctzombie/node-uuid) Generate RFC-compliant UUIDs in JavaScript.
- [react-native-uuid](https://github.com/eugenehp/react-native-uuid) node-uuid for react-native.
- [gulp](http://gulpjs.com/) Aren't NPM scripts better? [No](https://twitter.com/jaffathecake/status/700320306053935104).
- [raven-js](https://github.com/getsentry/raven-js) Crash reporting client for [Sentry](https://getsentry.com).
- [gulp-real-favicon](https://www.npmjs.com/package/gulp-real-favicon) Generate a multiplatform favicon with [RealFaviconGenerator](https://realfavicongenerator.net)
- [react-native-fbsdk](https://github.com/facebook/react-native-fbsdk) For Facebook Login in React Native. Follow the readme install notes.
- [rebass](https://github.com/jxnblk/rebass) Configurable React Stateless Functional UI Components
- And much more. Explore the repository.

## Prerequisites

- [node.js](http://nodejs.org) Node 6 with NPM 3 is required.
- [gulp](http://gulpjs.com/) `npm install -g gulp`
- [git](https://git-scm.com/downloads) git cmd tool is required


#### Optional

- [Facebook SDK for iOS](https://developers.facebook.com/docs/ios/) In order to make Facebook login work on iOS
- [Facebook SDK for Android](https://developers.facebook.com/docs/android/) In order to make Facebook login work on Android
- [firebase-cli](https://firebase.google.com/docs/cli/) `npm install -g firebase-tools`
- [firebase-bolt](https://github.com/firebase/bolt) `npm install -g firebase-bolt`
- [react-native-cli](http://facebook.github.io/react-native/docs/getting-started.html) `npm install -g react-native-cli`

If you are using different node versions on your machine, use [nvm](https://github.com/creationix/nvm) to manage them.

## Create App

```shell
git clone --depth=1 https://github.com/este/este.git este-app
cd este-app
npm install
```

## Start Development

- run `gulp`
- point your browser to [localhost:3000](http://localhost:3000)
- build something beautiful

React Native: [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)

## Dev Tasks

- `gulp` run web app in development mode
- `gulp ios` run iOS app in development mode
- `gulp android` run Android app in development mode
- `gulp -p` run web app in production mode
- `gulp -f` run web app in development mode, but only browser source rebuilds on file changes
- `gulp jest` run jest tests
- `gulp jest-watch` continuous test running for TDD
- `gulp eslint` eslint
- `gulp eslint --fix` fix fixable eslint issues
- `gulp messages-extract` extract messages for translation
- `gulp messages-check` check missing and unused translations
- `gulp messages-clear` remove unused translations
- `gulp favicon` create universal favicon

## Production Tasks

- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV and SERVER_URL
- `gulp to-html` render app to HTML for static hosting like [Firebase](https://www.firebase.com/features.html#features-hosting)
- `gulp deploy-heroku` deploy [Heroku](https://www.heroku.com/) app
- `gulp deploy-firebase` deploy [Firebase](https://firebase.google.com/) app
- `gulp deploy-firebase-database` deploy Firebase database only

## Customize Este App

- set name in `package.json`
- set locales, firebaseUrl, sentryUrl, etc. in `src/server/config.js`
- remove unused locale-data from `src/browser/index.js`
- change `src/common/app/favicons/original/favicon.png`, then `gulp favicon` and `gulp -p`
- remove unused reducers from `src/common/configureReducer.js`
- delete unused app features, todos for example: src/{platform}/todos
- modify your FB app_id e.g. for [iOS](https://developers.facebook.com/docs/ios/getting-started/#configure-xcode-project)

## Flow

- install [nuclide.io](https://nuclide.io/)
- go to Nuclide settings, enable "Use the Flow binary included in each project"

## Links

- [wiki](https://github.com/este/este/wiki)
- [twitter.com/estejs](https://twitter.com/estejs)

## Tips

- Recommended editor is [Atom](https://atom.io). Check [settings](https://github.com/este/este/wiki/Recommended-Atom.io-Settings).

## Training
- [learn-reactjs.com](http://www.learn-reactjs.com)
- [javascript-skoleni.cz](http://javascript-skoleni.cz)

## Credit

Made by [Daniel Steigerwald](https://twitter.com/steida) and the community.
