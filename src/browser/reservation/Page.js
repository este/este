import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class Reservation extends Component {

  static propTypes = {
    toggleMenu: RPT.func.isRequired
  }

  render() {
    return (
      <div style={style}>
        Nová rezervace
      </div>
    );
  }
}

const style = {
};
