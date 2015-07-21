import decorate from './decorate';
import devTools from './devtools';

export default function(store) {
  return process.env.IS_BROWSER
    ? Component => decorate(store)(devTools(Component))
    : decorate(store);
}
