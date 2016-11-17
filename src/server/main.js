/* @flow */
import config from './config';
// TODO: find an alternative method of catching and reporting errors.
// import errorHandler from './lib/errorHandler';
import resourceNotFound from './lib/resourceNotFound';
import express from 'express';
import frontend from './frontend';

const app = express();

// $FlowFixMe
app.use(frontend);

app.use(resourceNotFound);
// TODO: find an alternative method of catching and reporting errors.
// app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
