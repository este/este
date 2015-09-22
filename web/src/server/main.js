import api from './api';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import {Server} from 'http';

const app = express();
const server = Server(app);

app.use('/api/v1', api);
app.use(frontend);
app.use(errorHandler);

server.listen(config.port, () => {
  console.log('Server started at port %s', config.port);
});
