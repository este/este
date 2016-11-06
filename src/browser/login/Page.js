import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class Login extends Component {

  static propTypes = {
    toggleMenu: RPT.func.isRequired
  }

  render() {
    return (
      <div style={style}>
        login
      </div>
    );
  }
}

const style = {
};
