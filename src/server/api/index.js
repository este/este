import auth from './auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import todos from './todos';
import user from './user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/todos', todos);
app.use('/user', user);

app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;
