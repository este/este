import api from './api';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import {logServer} from './lib/logger';

const app = express();

app.use('/api/v1', api);
app.use(frontend);
app.use(errorHandler);

app.listen(config.port, () => {
  logServer(`Server started at port ${config.port}`);
});
