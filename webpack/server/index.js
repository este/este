if (process.env.NODE_ENV === 'production') {
  const message = 'Do not start webpack hot reload server in production environment.';
  throw new Error(message);
}

require('babel-register');
require('./main');
