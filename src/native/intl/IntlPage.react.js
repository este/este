import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../app/theme';
import { CenteredContainer, Text } from '../app/components';
import { FormattedDate, FormattedRelative } from 'react-intl';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

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
      <CenteredContainer>
        {locales.map(locale =>
          <Text
            style={{
              fontSize: theme.fontSizeH5,
              fontWeight: locale === currentLocale ? 'bold' : 'normal',
              marginBottom: theme.fontSizeBase * .5,
            }}
            key={locale}
            onPress={() => setCurrentLocale(locale)} // eslint-disable-line react/jsx-no-bind
          >{locale}</Text>
        )}
        <View style={{ marginTop: theme.fontSizeBase }}>
          <FormattedDate
            value={Date.now()}
            day="numeric"
            month="long"
            year="numeric"
            formatMatcher="basic" // while this bug remains in react-intl: https://github.com/andyearnshaw/Intl.js/issues/179
          >
            {date => <Text>{date}</Text>}
          </FormattedDate>
          <FormattedRelative
            initialNow={this.componentRenderedAt}
            updateInterval={1000 * 1}
            value={this.componentRenderedAt}
          >
            {relative => <Text>{relative}</Text>}
          </FormattedRelative>
        </View>
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales,
}), { setCurrentLocale })(IntlPage);
