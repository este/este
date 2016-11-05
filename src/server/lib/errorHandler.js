// @flow
import accepts from 'accepts';
import config from '../config';

const errorHandler = async (ctx: Object, next: Function) => {
  try {
    await next();
  } catch (err) {
    const errorDetails = err.stack || err;

    console.error('Error:', errorDetails);

    ctx.status = 500;
    const accept = accepts(ctx.request);
    // the order of this list is significant; should be server preferred order
    switch (accept.type(['json', 'html'])) {
      case 'json': {
        ctx.set('Content-Type', 'application/json');

        const errorInfo = {
          details: config.isProduction ? null : errorDetails,
          error: err.toString(),
        };

        ctx.body = errorInfo;
        break;
      }
      case 'html': {
        ctx.set('Content-Type', 'text/html');

        const message = config.isProduction
          ? '<p>Something went wrong</p>'
          : `<pre>${errorDetails}</pre>`;

        ctx.body = `<h1>500 Internal server error</h1>\n${message}`;
        break;
      }
      default: {
        // the fallback is text/plain, so no need to specify it above
        ctx.set('Content-Type', 'text/plain');

        const message = config.isProduction
          ? 'Something went wrong'
          : `${errorDetails}`;

        ctx.body = `500 Internal server error:\n${message}`;
        break;
      }
    }
  }
};

export default errorHandler;
