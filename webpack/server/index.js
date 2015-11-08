if (process.env.NODE_ENV === 'production')
  throw new Error('Do not start webpack hot reload server in production environment. You are likely using wrong npm start script');

require('babel/register')({stage: 0});

require('./main');
