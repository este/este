import api from './api';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import {port} from './config';

const app = express();

app.use('/api/v1', api);
app.use(frontend);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server started at port %d', port);
});
