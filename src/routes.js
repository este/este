import Todos from './pages/todos.react';
import Home from './pages/home.react';

export const routes = {
  todos: {
    component: Todos
  },
  home: {
    component: Home
  }
};

export const defaultRoute = 'home';
