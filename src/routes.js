import Todos from './pages/todos.react';
import About from './pages/about.react';

export const routes = {
  todos: {
    component: Todos
  },
  about: {
    component: About
  }
};

export const defaultRoute = 'about';
