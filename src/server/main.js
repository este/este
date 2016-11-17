/* @flow */
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';

const app = express();

// $FlowFixMe
app.use(frontend);
app.get('*', errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
