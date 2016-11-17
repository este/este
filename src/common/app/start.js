/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { appStart, appStop } from './actions';

const start = (WrappedComponent: Function) => {
  class Start extends React.Component {

    static propTypes = {
      intl: React.PropTypes.object.isRequired,
      appStart: React.PropTypes.func.isRequired,
      appStop: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { appStart } = this.props;
      // Must be called after the initial render to match server rendered HTML.
      appStart();
    }

    componentWillUnmount() {
      const { appStop } = this.props;
      // App is rerended on hot reload, therefore we need a proper cleanup.
      appStop();
    }

    render() {
      const { intl, ...props } = this.props;
      const { currentLocale, defaultLocale, initialNow, messages } = intl;

      return (
        <IntlProvider
          defaultLocale={defaultLocale}
          initialNow={initialNow}
          key={currentLocale} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <WrappedComponent {...props} />
        </IntlProvider>
      );
    }

  }

  Start = connect(
    (state: State) => ({
      intl: state.intl,
    }),
    { appStart, appStop },
  )(Start);

  return Start;
};


export default start;
