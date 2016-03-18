import * as intlActions from '../../common/intl/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Locales extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(React.PropTypes.string),
    setCurrentLocale: PropTypes.func.isRequired
  };

  render() {
    const { currentLocale, locales, setCurrentLocale } = this.props;

    return (
      <div className="locales">
        {locales.map(locale =>
          <button
            disabled={locale === currentLocale}
            key={locale}
            onClick={() => setCurrentLocale(locale)} // eslint-disable-line react/jsx-no-bind
          >{locale}</button>
        )}
      </div>
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales
}), intlActions)(Locales);

