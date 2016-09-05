/* @flow */
import compression from 'compression';
import esteMiddleware from '../lib/esteMiddleware';
import express from 'express';
import render from './render';

const app = express();

app.use(esteMiddleware());
app.use(compression());
app.use('/assets', express.static('build', { maxAge: '200d' }));
app.get('*', render);

export default app;
