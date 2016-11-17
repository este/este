/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import { Button, View } from '../app/components';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

const SwitchLocale = ({ currentLocale, locales, setCurrentLocale }) => (
  <View>
    {locales.map(locale =>
      <Button
        key={locale}
        mb={1}
        mr={1}
        onClick={() => setCurrentLocale(locale)}
        theme={locale === currentLocale ? 'primary' : 'secondary'}
      >
        {locale}
      </Button>,
    )}
  </View>
);

SwitchLocale.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  locales: React.PropTypes.arrayOf(React.PropTypes.string),
  setCurrentLocale: React.PropTypes.func.isRequired,
};

export default connect(
  (state: State) => ({
    currentLocale: state.intl.currentLocale,
    locales: state.intl.locales,
  }),
  { setCurrentLocale },
)(SwitchLocale);
