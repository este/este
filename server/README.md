* Files in this directory are written in plain JavaScript with Flow comments.
* Node8+ (http://node.green/) supports all ES features we need except ES modules, but we can use CommonJS instead. For Flow, we can use comments.
* Therefore, we don't need no transpilation for server code.
* http://vancelucas.com/blog/dont-transpile-javascript-for-node-js
* Server code is code used by the server. That's why we have `error.js` etc here.
* Server code without server dependencies can be reused on the client.
