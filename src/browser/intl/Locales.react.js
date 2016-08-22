import React from 'react';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

const Locales = ({ currentLocale, locales, setCurrentLocale }) => (
  <div className="locales">
    {locales.map(locale =>
      <button
        disabled={locale === currentLocale}
        key={locale}
        onClick={() => setCurrentLocale(locale)}
      >
        {locale}
      </button>
    )}
  </div>
);

Locales.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  locales: React.PropTypes.arrayOf(React.PropTypes.string),
  setCurrentLocale: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales,
}), { setCurrentLocale })(Locales);
