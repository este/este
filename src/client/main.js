import routes from './routes';
import App from './app/app.react';

const app = document.getElementById('app');
App.run(app, routes, window._initialState);
