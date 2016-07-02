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
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  loadingText: {
    defaultMessage: 'Loading',
    id: 'loading.loadingText'
  },
  longLoadingText: {
    defaultMessage: 'Still loading, please check your connection',
    id: 'loading.longLoadingText'
  }
});

export default class Loading extends Component {

  static propTypes = {
    loadingText: PropTypes.string.isRequired,
    longLoadingText: PropTypes.string.isRequired
  };

  static defaultProps = {
    loadingText: 'Loading',
    longLoadingText: 'Still loading, please check your connection'
  };

  constructor(props) {
    super(props);
    this.state = {
      currentText: null
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ currentText: messages.loadingText });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: messages.longLoadingText });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  render() {
    const { currentText } = this.state;
    return (
      <div>
        {currentText ?
          <div className="este-loading">
            <FormattedMessage {...currentText}>
              {title => <Helmet title={title} />}
            </FormattedMessage>
            <FormattedMessage {...currentText} />
          </div>
          : String.fromCharCode(160)}
      </div>
    );
  }

}
