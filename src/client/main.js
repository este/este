import React from 'react';
import routes from './routes';
import {history} from 'react-router/lib/BrowserHistory';
import {measureRender} from './console';
import {Router} from 'react-router';

const app = document.getElementById('app');

// TODO measure route render - is it even possible now?

React.render(<Router children={routes} history={history} />, app);
