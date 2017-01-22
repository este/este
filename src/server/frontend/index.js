// @flow
import compress from 'koa-compress';
import createRouter from 'koa-router';
import render from './render';
import serve from 'koa-static';

const useFrontend = (app: Object) => {
  app.use(compress());
  app.use(serve('/assets', { maxAge: '200d' }));

  const router = createRouter();
  router.get('*', render);
  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default useFrontend;
