import PureComponent from '../../../lib/purecomponent';
import React from 'react';
import immutable from 'immutable';
import {onLanguageChange} from '../../intl/actions';

export default class Language extends PureComponent {

  render() {
    return (
      <div>
        <label>Language:</label>
        <select defaultValue={this.props.default} onChange={onLanguageChange}>
          {this.props.langs.map(locale => {
            return <option key={locale.get('id')} value={locale.get('id')} >
              {locale.get('text')}</option>;
          })}
        </select>
      </div>
    );
  }

}

Language.propTypes = {
  langs: React.PropTypes.instanceOf(immutable.List),
  default: React.PropTypes.string
};
