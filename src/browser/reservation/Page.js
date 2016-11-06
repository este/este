import React, { PureComponent as Component } from 'react';
import SeatPicker from './SeatPicker';

export default class Reservation extends Component {

  render() {
    return (
      <div style={style}>
        Nová rezervace
        <div>
          Vyberte si 2 místa
        </div>
        <div>
          <SeatPicker />
        </div>
      </div>
    );
  }
}

const style = {
};
