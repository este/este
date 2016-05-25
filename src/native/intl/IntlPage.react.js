import * as intlActions from '../../common/intl/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import appStyles from '../app/styles';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class IntlPage extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(React.PropTypes.string),
    setCurrentLocale: PropTypes.func.isRequired
  };

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
      </View>
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales
}), intlActions)(IntlPage);
