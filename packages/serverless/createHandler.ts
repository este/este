import { createServer, IncomingMessage, ServerResponse } from 'http';
import url from 'url';

// Create a single purpose serverless handler with typed input and output.

export interface HandlerInput {
  secret: string;
}

// Note we return http status in JSON response because we can type details.
export type HandlerOutput<Value> =
  | {
      status: 200;
      value: Value;
    }
  | {
      status: 401;
    }
  | {
      status: 500;
      error: string;
    };

const { HANDLER_SECRET, IS_NOW } = process.env;

export const createHandler = <
  Input extends HandlerInput,
  Value extends any
>(options: {
  port: number;
  handle: (input: Input) => Promise<Value>;
}) => {
  const handler = async (req: IncomingMessage, res: ServerResponse) => {
    // We can cast because we use types across the whole app.
    const input: Input = url.parse(req.url || '', true).query as any;

    const end = (output: HandlerOutput<Value>) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const outputString = IS_NOW
        ? JSON.stringify(output)
        : JSON.stringify(output, null, 2);
      res.end(outputString);
    };

    if (input.secret !== HANDLER_SECRET) {
      end({ status: 401 });
      return;
    }

    try {
      const value = await options.handle(input);
      end({ status: 200, value });
    } catch (error) {
      end({ status: 500, error: error.toString() });
    }
  };
  if (!IS_NOW) {
    createServer(handler).listen(options.port);
  }
  return handler;
};
