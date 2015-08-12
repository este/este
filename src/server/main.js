import api from './api';
import config from './config';
import errorHandler from './lib/errorhandler';
import {reviveUserByHeader} from './lib/reviveuser';
import express from 'express';
import frontend from './frontend';
import {Server} from 'http';

const app = express();
const server = Server(app);

app.use(reviveUserByHeader);

// Load API.
app.use('/api/v1', api);

// Load react-js frontend.
app.use(frontend);

// Error reporting
app.use(errorHandler);

server.listen(config.port, () => {
  console.log('Server started at port %s', config.port);
});
