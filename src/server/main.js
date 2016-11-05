// @flow
import config from './config';
import errorHandler from './lib/errorHandler';
import Koa from 'koa';
import useFrontend from './frontend';

const app = new Koa();

app.use(errorHandler);

useFrontend(app);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
