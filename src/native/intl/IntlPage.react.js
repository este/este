import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../../common/app/theme';
import {
  CenteredContainer,
  FormattedDate,
  FormattedRelative,
  Text,
} from '../app/components';
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
              marginBottom: theme.fontSize * .5,
            }}
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
    );
  }

}

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
  locales: state.intl.locales,
}), { setCurrentLocale })(IntlPage);
