/* @flow */
import React from 'react';

const pseudo = (WrappedComponent: Function) =>
  class Pseudo extends React.Component {

    state: {
      hover: bool;
    };

    onMouseEnter: () => void;
    onMouseLeave: () => void;

    constructor() {
      super();
      this.state = {
        hover: false,
      };
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
      this.setState({ hover: true });
    }

    onMouseLeave() {
      this.setState({ hover: false });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          pseudo={this.state}
        />
      );
    }
  };

export default pseudo;
