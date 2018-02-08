Node8+ (http://node.green/) supports all ES features we need.
Except ES modules, but we can use CommonJS instead.
For Flow, we can use comments. By that, we don't mix ES6 modules with CommonJS.
Therefore, I suppose server code should not be transpiled at all.
http://vancelucas.com/blog/dont-transpile-javascript-for-node-js
Also, all server related code should be here, because of nodemon.
