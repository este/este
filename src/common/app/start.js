import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { firebaseActions } from '../lib/redux-firebase';
import { logout } from '../auth/actions';
import { updateAppStateFromStorage } from './actions';

export default function start(Wrapped) {
  class Start extends Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired
    };

    componentDidMount() {
      const { dispatch } = this.props;
      // Client side changes must be dispatched after componentDidMount.
      dispatch(firebaseActions.watchAuth(logout));
      dispatch(updateAppStateFromStorage());
    }

    render() {
      const { intl } = this.props;
      const { currentLocale, defaultLocale, initialNow, messages } = intl;

      return (
        <IntlProvider
          defaultLocale={defaultLocale}
          initialNow={initialNow}
          key={currentLocale} // https://github.com/yahoo/react-intl/issues/234
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <Wrapped {...this.props} />
        </IntlProvider>
      );
    }

  }

  Start = connect(state => ({
    intl: state.intl
  }))(Start);

  return Start;
}
