import ReactDOM from 'react-dom';
import ValidationError from '../../common/lib/ValidationError';

export default function focusInvalidField(component, error) {
  if (!(error instanceof ValidationError)) return;
  if (!error.prop) return;
  const node = ReactDOM.findDOMNode(component);
  if (!node) return;
  const el = node.querySelector(`[name=${error.prop}]`);
  if (!el) return;
  el.focus();
}
