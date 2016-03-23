// Text loading component with two important limits.
// https://www.nngroup.com/articles/response-times-3-important-limits
// Example:
// {!users ?
//   <Loading />
// :
//   <div>
//     users here
//   </div>
// }
// TODO: Make it universal.

import './Loading.scss';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Loading',
    id: 'lib.loading.title'
  },
  loadingText: {
    defaultMessage: 'Loading',
    id: 'lib.loading.loadingText'
  },
  longLoadingText: {
    defaultMessage: 'Still loading, please check your internet connection',
    id: 'lib.loading.longLoadingText'
  }
});

class Loading extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // Don't show anything for the first second.
      currentText: ''
    };
  }

  componentDidMount() {
    const { intl } = this.props;
    const loadingText = intl.formatMessage(messages.loadingText);
    const longLoadingText = intl.formatMessage(messages.longLoadingText);
    this.timer = setTimeout(() => {
      this.setState({ currentText: loadingText });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: longLoadingText });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);
    return (
      <div className="este-loading">
        <Helmet title={title} />
        {this.state.currentText}
      </div>
    );
  }

}

Loading = injectIntl(Loading);

export default Loading;
