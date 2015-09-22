import {ValidationError} from '@este/common';
import ReactDOM from 'react-dom';

export default function focusInvalidField(component, error) {
  if (!(error instanceof ValidationError)) return;
  if (!error.prop) return;
  const node = ReactDOM.findDOMNode(component);
  if (!node) return;
  const el = node.querySelector(`[name=${error.prop}]`);
  if (!el) return;
  el.focus();
}
