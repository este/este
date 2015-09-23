import auth from './auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {logServer} from '../lib/logger';

// Create general-purpose API sub-app
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Add auth module to handle user authentication
app.use('/auth', auth);

app.on('mount', () => {
  logServer(`Api is available at ${app.mountpath}`);
});

export default app;
