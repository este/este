# mi-nur-cinema

[![Circle CI](https://img.shields.io/circleci/project/jakubkottnauer/mi-nur-cinema/master.svg)](https://circleci.com/gh/jakubkottnauer/mi-nur-cinema)

## Start Development
```
git clone https://github.com/jakubkottnauer/mi-nur-cinema.git
npm i -g yarnpkg // if you don't have it yet
yarn
gulp
// server started at localhost:3000
```

## Dev Tasks

- `gulp` run web app in development mode
- `gulp -p` run web app in production mode
- `gulp -f` run web app in development mode, but only browser source rebuilds on file changes
- `gulp ava` run ava unit tests
- `gulp ava-watch` continuous test running for TDD
- `gulp eslint` eslint
- `gulp eslint --fix` fix fixable eslint issues

## Production Tasks

- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV and SERVER_URL
