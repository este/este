import { createServer, IncomingMessage, ServerResponse } from 'http';
import cors from 'micro-cors';

export const createServerlessHandler = (
  port: number,
  handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>,
) => {
  const corsHandler = cors({
    allowHeaders: [
      // https://github.com/possibilities/micro-cors#readme
      'X-Requested-With',
      'Access-Control-Allow-Origin',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Authorization',
      'Accept',
      // This is for Playground.
      'x-apollo-tracing',
    ],
  })((req, res) => {
    // https://github.com/apollographql/apollo-server/issues/2473
    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }
    return handler(req, res);
  });
  if (!process.env.IS_NOW) {
    createServer(corsHandler).listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`ready on http://localhost:${port}`);
    });
  }
  return corsHandler;
};
