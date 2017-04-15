<img
  alt="Este.js"
  src="https://cloud.githubusercontent.com/assets/66249/6515278/de638916-c388-11e4-8754-184f5b11e770.jpeg"
  width="200"
/>

[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Join the chat at https://gitter.im/este/este](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)
[![GitHub license](https://img.shields.io/github/license/este/este.svg)](https://github.com/este/este/blob/master/LICENSE)

> Starter kit for universal full–fledged React apps. One stack for browser, mobile, server.

> You don't have to start with everything. Este is perfect even for plain static pages. You can gracefully add any platform later. Este mission is simple: **Help startups to deliver minimum viable product asap with the state of the art real-time universal app stack**.

> Pokud máte zájem o školení JavaScript, React.js, nebo Este.js, podívejte se na [javascript-skoleni.cz](https://javascript-skoleni.cz/).

## Techniques

- universal architecture with immutable app state
  - code shared across platforms (browser, server, native mobile)
  - server side rendering or server-less pre-rendering to HTML files
  - universal internationalization
  - universal crash reporting
  - universal data fetching
  - universal forms with universal validation
  - [universal components with universal styles](https://medium.com/@steida/css-in-js-the-argument-refined-471c7eb83955)
- stateless functional UI with dynamic typed styles
- flowtype FTW
- vanilla hot reloading makes everything hot reloadable
- [Firebase](https://firebase.google.com/) integration ([este.firebaseapp.com](https://este.firebaseapp.com))
  - email and facebook login
  - declarative queryFirebase higher order component for Firebase imperative API
  - users presence

## Libraries

- [redux](http://reactjs.github.io/redux/)
- [redux-observable](https://github.com/redux-observable/redux-observable)
- [found](https://github.com/4Catalyzer/found)
- [ramda](http://ramdajs.com/)
- [react-intl](https://github.com/yahoo/react-intl)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [formatjs](http://formatjs.io/)
- [jest](https://facebook.github.io/jest/) Painless JavaScript Testing.
- [raven-js](https://github.com/getsentry/raven-js) Crash reporting client for [Sentry](https://getsentry.com).
- [fela](https://github.com/rofrischmann/fela) Universal, Dynamic & High-Performance Styling in JavaScript
- And much more. Explore the repository.

## Prerequisites

- [node.js](http://nodejs.org) Node 6+
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
git clone
cd este
yarn (or npm install)
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
- `gulp prettier` prettify source code

## Production Tasks

- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV
- `gulp to-html` render app to HTML for static hosting like [Firebase](https://www.firebase.com/features.html#features-hosting)
- `gulp deploy-now` deploy to [Now](https://zeit.co/now/)
- `gulp deploy-heroku` deploy to [Heroku](https://www.heroku.com/)
- `gulp deploy-firebase` deploy to [Firebase](https://firebase.google.com/)
- `gulp deploy-firebase-database` deploy Firebase database only

## Customize Este App

- set name in `package.json`
- set locales, firebaseUrl, sentryUrl, etc. in `src/server/config.js`
- change `src/common/app/favicons/original/favicon.png`, then `gulp favicon` and `gulp -p`
- modify your FB app_id e.g. for [iOS](https://developers.facebook.com/docs/ios/getting-started/#configure-xcode-project)

## Links

- [wiki](https://github.com/este/este/wiki)
- [twitter.com/estejs](https://twitter.com/estejs)

## Tips

- Recommended editor is [Atom](https://atom.io). Check [settings](https://github.com/este/este/wiki/Recommended-Atom.io-Settings).
- Install [nuclide.io](https://nuclide.io/), enable "Use the Flow binary included in each project".

## Credit

Made by [Daniel Steigerwald](https://twitter.com/steida) and the community.
