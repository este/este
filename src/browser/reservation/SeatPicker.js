import React, { PureComponent as Component } from 'react';
import Seat from './Seat';
import { PinchView } from '../lib/react-pinch-zoom-pan';

export default class SeatPicker extends Component {

  render() {
    return (
      <PinchView debug bmaxScale={4} containerRatio={((400 / 600) * 100)}>
        <div>
          <div style={style.row}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </div>
          <div style={style.row}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </div>
          <div style={style.row}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </div>
          <div style={style.row}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </div>
        </div>
      </PinchView>
    );
  }
}

const style = {
  row: {
    clear: 'both',
    width: '100%'
  }
};
