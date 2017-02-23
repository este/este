import models from './models';
import express from 'express';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './services/auth';
import connectMongo from 'connect-mongo';
import schema from './schema';

const MongoStore = connectMongo(session);
const MONGO_URI = 'mongodb://localhost:27017';

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);

mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance'))
  .on('error', (error) => console.log('Error connecting to MongoDB instance: ', error))

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbcc', // TODO
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

export default app;

