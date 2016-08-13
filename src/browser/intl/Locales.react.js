import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

class Locales extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(React.PropTypes.string),
    setCurrentLocale: PropTypes.func.isRequired,
  };

  render() {
    const { currentLocale, locales, setCurrentLocale } = this.props;

    return (
      <div className="locales">
        {locales.map(locale =>
          <button
            disabled={locale === currentLocale}
            key={locale}
            onClick={() => setCurrentLocale(locale)}
          >{locale}</button>
        )}
      </div>
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales,
}), { setCurrentLocale })(Locales);
