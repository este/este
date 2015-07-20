import decorator from './decorator';
import devTools from './devtools';

export default function(store) {
  return process.env.IS_BROWSER
    ? Component => decorator(store)(devTools(Component))
    : decorator(store);
}
