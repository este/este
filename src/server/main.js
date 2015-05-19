import config from './config';
import express from 'express';
import {Server} from 'http';

const app = exports.app = express();
const server = exports.server = Server(app);

// TODO: Add API sub-app to demonstrate other use cases
// app.use('/api/v1', require('./api'));

// Load react-js frontend
app.use(require('./frontend'));

// Add error handler
app.use((err, res) => {
  res.send(err.message);
});

server.listen(config.port, () => {
  const address = server.address().address;
  const port = server.address().port;
  console.log('Server started at %s:%s', address, port);
});
