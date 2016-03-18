import ReactDOM from 'react-dom';
import ValidationError from './ValidationError';

// This is dumb, but it works.
export default function focusInvalidField(component, error) {
  if (!(error instanceof ValidationError)) return;
  if (!error.params.prop) return;
  const node = ReactDOM.findDOMNode(component);
  if (!node) return;
  const el = node.querySelector(`[name=${error.params.prop}]`);
  if (!el) return;
  el.focus();
}
