import auth from './auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Create general-purpose API sub-app
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Add auth module to handle user authentication
app.use('/auth', auth);

app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;
