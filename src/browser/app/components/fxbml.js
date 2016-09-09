/* @flow */
// Higher order component for Facebook XFBML.
// Examples
//  https://gist.github.com/steida/04a39dfa1043e1451044ba8370743b0c
//  https://gist.github.com/steida/b19a1858e38007651a616ae44244ca52
import React from 'react';

const xfbml = (WrappedComponent: any) =>
  class Wrapper extends React.Component {

    el: Element;
    isMounted: boolean;

    parseXfbmlAsap() {
      if (window.FB) {
        window.FB.XFBML.parse(this.el);
        return;
      }
      const fbAsyncInit = window.fbAsyncInit;
      // Aspect Oriented Programming ftw.
      window.fbAsyncInit = () => {
        fbAsyncInit();
        if (!this.isMounted) return;
        window.FB.XFBML.parse(this.el);
      };
    }

    componentDidMount() {
      this.isMounted = true;
      this.parseXfbmlAsap();
    }

    componentWillUnmount() {
      this.isMounted = false;
    }

    onWrappedComponentRef(el: Element) {
      this.el = el;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          ref={el => this.onWrappedComponentRef(el)}
        />
      );
    }

  };

export default xfbml;
