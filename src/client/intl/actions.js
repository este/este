import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';

export function onLanguageChange({target: {value}}) {
  dispatch(onLanguageChange, value);
}

setToString('intl', {
  onLanguageChange
});
