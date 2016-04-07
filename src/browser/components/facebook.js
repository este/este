// A higher order component for Facebook XFBML.
// Examples
//  https://gist.github.com/steida/04a39dfa1043e1451044ba8370743b0c
//  https://gist.github.com/steida/b19a1858e38007651a616ae44244ca52

import Component from 'react-pure-render/component';
import React from 'react';
import ReactDOM from 'react-dom';

export default function facebook(Wrapped) {
  return class Wrapper extends Component {

    parseXfbmlAsap(el) {
      if (window.FB) {
        window.FB.XFBML.parse(el);
        return;
      }
      const fbAsyncInit = window.fbAsyncInit;
      // Aspect Oriented Programming ftw.
      window.fbAsyncInit = () => {
        fbAsyncInit();
        if (!this._isMounted) return;
        window.FB.XFBML.parse(el);
      };
    }

    componentDidMount() {
      this._isMounted = true;
      const el = ReactDOM.findDOMNode(this);
      this.parseXfbmlAsap(el);
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}
