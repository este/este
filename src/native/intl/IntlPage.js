/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import theme from '../app/themes/initial';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';
import {
  CenteredContainer,
  FormattedDate,
  FormattedRelative,
  Text,
} from '../app/components';

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.fontSizeH5,
  },
  text: {
    fontSize: theme.fontSizeH5,
    marginBottom: theme.fontSize * 0.5,
  },
  selected: {
    fontWeight: 'bold',
  },
});

const IntlPage = ({ currentLocale, locales, setCurrentLocale }) => {
  const componentRenderedAt = Date.now();
  return (
    <ScrollView>
      <CenteredContainer style={styles.container}>
        {locales.map(locale =>
          <Text
            style={[styles.text, locale === currentLocale && styles.selected]}
            key={locale}
            onPress={() => setCurrentLocale(locale)}
          >{locale}</Text>,
        )}
        <FormattedDate
          day="numeric"
          month="short"
          style={{ margin: theme.fontSize }}
          value={Date.now()}
          year="numeric"
        />
        <FormattedRelative
          initialNow={componentRenderedAt}
          updateInterval={1000 * 1}
          value={componentRenderedAt}
        />
      </CenteredContainer>
    </ScrollView>
  );
};

IntlPage.propTypes = {
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
)(IntlPage);
