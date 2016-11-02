import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import stubs from './api/stubs';

const app = express();

app.use('/api', stubs);
app.use(frontend);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
