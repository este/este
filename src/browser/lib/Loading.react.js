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

import './Loading.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

export default class Loading extends Component {

  static propTypes = {
    loadingText: PropTypes.string.isRequired,
    longLoadingText: PropTypes.string.isRequired
  };

  static defaultProps = {
    loadingText: 'Loading',
    longLoadingText: 'Still loading, please check your internet connection'
  };

  constructor(props) {
    super(props);
    this.state = {
      // Don't show anything for the first second.
      currentText: ''
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ currentText: this.props.loadingText });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: this.props.longLoadingText });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  render() {
    return (
      <div className="este-loading">
        {this.state.currentText}
      </div>
    );
  }

}
