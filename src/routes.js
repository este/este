import Todos from './pages/todos.react';
import Home from './pages/home.react';

/**
 * Simple definition of your routes
 * Each element must define a component
 * Optionally it can provide style to apply to sceneView
 * animationType to override default animation
 * use navigation.transitionTo(key) to go to a route
 * Feel free to extend this object with properties you need
 */
export const routes = {
  todos: {
    component: Todos
  },
  home: {
    component: Home
  }
};

export const defaultRoute = 'home';
