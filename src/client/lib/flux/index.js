import flux from './flux.react';
import devTools from './devtools';

export default function(store) {
  return process.env.IS_BROWSER
    ? Component => flux(store)(devTools(Component))
    : flux(store);
}
