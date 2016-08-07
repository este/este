import * as components from '../app/components';
import React, { Component, PropTypes } from 'react';
import theme from '../app/theme';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

const {
  CenteredContainer,
  FormattedDate,
  FormattedRelative,
  Text,
} = components;

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizeH5,
    marginBottom: theme.fontSize * .5,
  },
  selected: {
    fontWeight: 'bold',
  },
});

class IntlPage extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(React.PropTypes.string),
    setCurrentLocale: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.componentRenderedAt = Date.now();
  }

  render() {
    const { currentLocale, locales, setCurrentLocale } = this.props;

    return (
      <ScrollView>
        <CenteredContainer>
          {locales.map(locale =>
            <Text
              style={[styles.text, locale === currentLocale && styles.selected]}
              key={locale}
              onPress={() => setCurrentLocale(locale)} // eslint-disable-line react/jsx-no-bind
            >{locale}</Text>
          )}
          <FormattedDate
            day="numeric"
            month="short"
            style={{ margin: theme.fontSize }}
            value={Date.now()}
            year="numeric"
          />
          <FormattedRelative
            initialNow={this.componentRenderedAt}
            updateInterval={1000 * 1}
            value={this.componentRenderedAt}
          />
        </CenteredContainer>
      </ScrollView>
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales,
}), { setCurrentLocale })(IntlPage);
