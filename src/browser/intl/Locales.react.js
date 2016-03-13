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

  setLocale(locale) {
    const { setCurrentLocale } = this.props;
    setCurrentLocale(locale);
  }

  render() {
    const { currentLocale, locales } = this.props;

    return (
      <div className="locales">
        {locales.map(locale =>
          <button
            disabled={locale === currentLocale}
            key={locale}
            onClick={() => this.setLocale(locale)} // eslint-disable-line react/jsx-no-bind
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

