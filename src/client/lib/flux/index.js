import Flux from './flux.react';
import devTools from './devtools';

export default function(store) {
  return process.env.IS_BROWSER
    ? Component => Flux(store)(devTools(Component))
    : Flux(store);
}
