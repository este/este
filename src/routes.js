import Todos from './pages/todos.react';
import Home from './pages/home.react';

export const routes = {
  todos: {
    component: Todos,
    hideNavbar: true
  },
  home: {
    component: Home
  }
};

export const defaultRoute = 'home';
