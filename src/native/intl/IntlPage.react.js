import * as intlActions from '../../common/intl/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import appStyles from '../app/styles';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormattedDate, FormattedRelative } from 'react-intl';

class IntlPage extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(React.PropTypes.string),
    setCurrentLocale: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.componentRenderedAt = Date.now();
  }

  render() {
    const { currentLocale, locales, setCurrentLocale } = this.props;

    return (
      <View style={[appStyles.centeredView, { paddingBottom: 64 }]}>
        {locales.map(locale =>
          <Text
            style={[appStyles.centered, {
              fontSize: 30,
              fontWeight: locale === currentLocale ? 'bold' : 'normal'
            }]}
            key={locale}
            onPress={() => setCurrentLocale(locale)} // eslint-disable-line react/jsx-no-bind
          >{locale}</Text>
        )}
        <View style={{ marginTop: 16 }}>
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
      </View>
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales
}), intlActions)(IntlPage);
