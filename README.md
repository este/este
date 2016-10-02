# ChatX
[http://chatx.oklm.fm](http://chatx.oklm.fm)

> This project is a little chat application made with React/Redux, on top of [este](https://github.com/este/este) boilerplate.
> It was originally created for a job test, and for learning React+Redux+ES6+ImmutableJS.

## Prerequisites

- [node.js](http://nodejs.org) Node 6 with NPM 3 is required.
- [gulp](http://gulpjs.com/) `npm install -g gulp`
- [git](https://git-scm.com/downloads) git cmd tool is required

## Create App

```shell
git clone --depth=1 https://github.com/pakokrew/ChatX.git
cd ChatX
npm install
```

## Run in Development mode

- run `gulp`
- point your browser to [localhost:3000](http://localhost:3000)
- chat with the huge amount of people present in the app !
- try editing some code

## TODOs

- Select multiple channels
- Delete a room by owner
- Access directly to a room by URL chat/roomId
- Read firebase with child_* event for not reloading whole data
- Style online users
- Use id instead of copies/references in nested data (rooms/{id}/onlineUsers/* and messages/{id}/sender)

## Dev Tasks

- `gulp` run web app in development mode
- `gulp -p` run web app in production mode
- `gulp -f` run web app in development mode, but only browser source rebuilds on file changes
- `gulp ava` run ava unit tests
- `gulp ava-watch` continuous test running for TDD
- `gulp eslint` eslint
- `gulp eslint --fix` fix fixable eslint issues
- `gulp messages-extract` extract messages for translation
- `gulp messages-check` check missing and unused translations
- `gulp messages-clear` remove unused translations
- `gulp favicon` create universal favicon

## Production Tasks

- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `gulp to-html` render app to HTML for static hosting like [Firebase](https://www.firebase.com/features.html#features-hosting)
- `gulp deploy-firebase` deploy [Firebase](https://firebase.google.com/) app
- `gulp deploy-firebase-database` deploy Firebase database only

## Credit

- [este](https://github.com/este/este) : Original boilerplate made by [Daniel Steigerwald](https://twitter.com/steida) and the community.
